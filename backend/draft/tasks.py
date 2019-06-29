from celery import shared_task
from .models import Draft
from subscribe.models import Group, Subscriber
from decouple import config
import boto3
import time
import random
import math
import json

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)

# creates email template
# this is because bulk mail demands it
def create_template(draft):
    tname = str(draft.id) + '-' + str(random.random())[2:]
    print(tname, 'creating template')

    # fit the attachments
    tbody = draft.body
    tbody += '<h3>Attachments: </h3>'
    tbody += '<ol>'
    files = draft.files.all()
    
    for file in files:
        print(file)
        tbody += '<li><a href={}{} download>{}</a></li>'.format(
            config('hostname') + 'media/', file.file, str(file.file).split('/').pop())
    tbody += '</ol>'
    
    if not files:
        tbody += '<div>none</div>'

    tbody += '''
        <hr style='margin-top:30px'>
        <div style='text-align:center'>
            <a href='{}unsubscribe/?email={{{{email}}}}'>unsubscribe from our mailing list</a>
        </div>
    '''.format(config('hostname'))

    response = client.create_template(
        Template={
            'TemplateName': tname,
            'SubjectPart': draft.subject,
            'HtmlPart': tbody,
            'TextPart': tbody
        }
    )
    print(tname, 'template created')
    print(response)
    return tname

def create_destination(email):
    return {
        "Destination": {
            "BccAddresses": [email]
        },
        "ReplacementTemplateData": json.dumps({ "email": email})
    }

# this divides the subs into batches of size = aws allowed sending freq/sec
# and sends the mail with the help of the template
def send_mails_finally(subs, tname):
    bs = int(config('batch_size'))
    l = math.ceil(len(subs)/bs)
    subs = [subs[x*bs-bs: x*bs] for x in range(1, l+1)]

    source = config('from')

    for batch in subs:
        destinations = [create_destination(x) for x in batch]
        time.sleep(1)
        response = client.send_bulk_templated_email(
            Source=source,
            Template=tname,
            Destinations=destinations,
            DefaultTemplateData="{}"
        )
        print(response)

# it coordinates the above 2 funcs
# and updates the draft status to 2 = sent
@shared_task
def start_bulk_mail(draft, groups):
    draft = Draft.objects.get(pk=draft)
    subs = []
    group_names = []

    print(groups)
    for group_id in groups:
        group = Group.objects.get(id=group_id)
        group_names.append(group.name)
        filter_subs = group.subs.filter(flag=False, verified=True)
        subs.extend(filter_subs)

    subs = [x.email for x in subs]
    print('sending to', len(subs))
    print(subs)

    # update the info to the draft
    draft.group = ', '.join(group_names)
    draft.sentTo = len(subs)
    draft.save()

    # create the template
    tname = create_template(draft)

    # create batches and send mails
    send_mails_finally(subs, tname)

    # set draft status to sent
    
    draft.status = 2
    draft.save()
    print('killed bulk mail')

# handles bounced mail
# it block the email which got bounced
@shared_task
def handle_bounce_async(msg):
    msg = json.loads(msg)

    try:    
        emails = msg['bounce']['bouncedRecipients']
        emails = [x['emailAddress'] for x in emails]

        for email in emails:
            subs = Subscriber.objects.filter(email=email)
            for sub in subs:
                sub.status = 'bounced'
                sub.flag = True
                sub.save()

        print('bounce', emails)
    except:
        print(msg)


# handles complaint mail
# it block the email which got complainted
@shared_task
def handle_complaint_async(msg):
    msg = json.loads(msg)

    try:
        emails = msg['complaint']['complainedRecipients']
        emails = [x['emailAddress'] for x in emails]

        for email in emails:
            subs = Subscriber.objects.filter(email=email)
            for sub in subs:
                sub.status = 'complaint'
                sub.flag = True
                sub.save()

        print('complaint', emails)
    except:
        print(msg)
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
        tbody += '<li><a href={}/{}>{}</a></li>'.format(
            config('hostname'), file.file, file.file)
    tbody += '</ol>'
    if not files:
        tbody += '<div>none</div>'

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


def send_mails_finally(subs, tname):
    bs = int(config('batch_size'))
    l = math.ceil(len(subs)/bs)
    subs = [subs[x*bs-bs: x*bs] for x in range(1, l+1)]

    source = config('from')

    for batch in subs:
        time.sleep(1)
        response = client.send_bulk_templated_email(
            Source=source,
            Template=tname,
            Destinations=[
                {
                    "Destination": {
                        "ToAddresses": batch
                    },
                    "ReplacementTemplateData": "{}"
                }
            ],
            DefaultTemplateData="{}"
        )
        print(response)


@shared_task
def start_bulk_mail(draft, group):
    draft = Draft.objects.get(pk=draft)
    group = Group.objects.get(pk=group)
    # set status to sending

    print(draft, group)

    subs = group.subs.filter(flag=False, verified=True)
    subs = [x.email for x in subs]
    print('sending to', len(subs))

    # create the template
    tname = create_template(draft)

    # create batches and send mails
    send_mails_finally(subs, tname)

    # set draft status to sent
    draft.group = group.name
    draft.sentTo = group.subs.count()
    draft.status = 2
    draft.save()
    print('killed bulk mail')


@shared_task
def handle_bounce_async(msg):
    msg = json.loads(msg)
    emails = msg['bounce']['bouncedRecipients']
    emails = [x['emailAddress'] for x in emails]

    for email in emails:
        subs = Subscriber.objects.filter(email=email)
        for sub in subs:
            sub.status = 'bounced'
            sub.flag = True
            sub.save()

    print('bounce', emails)


@shared_task
def handle_complaint_async(msg):
    msg = json.loads(msg)
    emails = msg['complaint']['complainedRecipients']
    emails = [x['emailAddress'] for x in emails]

    for email in emails:
        subs = Subscriber.objects.filter(email=email)
        for sub in subs:
            sub.status = 'complaint'
            sub.flag = True
            sub.save()

    print('complaint', emails)

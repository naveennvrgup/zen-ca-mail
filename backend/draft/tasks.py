from celery import shared_task
from .models import Draft
from subscribe.models import Group
from decouple import config
import boto3
import time
import random
import math

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
    tbody = '<h3>Attachments: </h3>'
    tbody += '<ol>'
    files = draft.files.all()
    for file in files:
        print(file)
        tbody += '<li><a href={}>{}</a></li>'.format(file.file, file.file)
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
        time.sleep(55)
        response = client.send_bulk_templated_email(
            Source=source,
            Template=tname,
            Destinations=[
                {
                    "Destination": {
                        "ToAddresses": batch
                    },
                    "ReplacementTemplateData":"{}"
                }
            ],
            DefaultTemplateData="{}"
        )
        print(response)


@shared_task
def start_bulk_mail(draft, group):
    subs = group.subs.all()
    subs = [x.email for x in subs]

    # create the template
    tname = create_template(draft)

    # create batches and send mails
    send_mails_finally(subs, tname)

    # set draft status to sent
    draft.status = 2
    draft.save()

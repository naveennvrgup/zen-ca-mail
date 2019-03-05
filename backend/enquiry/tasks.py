from celery import shared_task

from decouple import config
from .models import Enquiry
import boto3

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)


@shared_task
def send_enquiry_mail(eid):
    print('enquiry id', eid)
    enquiry = Enquiry.objects.get(pk=int(eid))

    response = client.send_email(
        Destination={
            'ToAddresses': [config('caemail')]
        },
        Message={
            'Body': {
                'Html': {
                    'Charset': 'utf-8',
                    'Data': '<h1>New enquiry from website:</h1>\
                        <p><b>Name: </b>{}</p>\
                        <p><b>Mobile: </b>{}</p>\
                        <p><b>bail: </b>{}</p>\
                        <p><b>Enquiry: </b><br>{}</p>'
                    .format(enquiry.name, enquiry.mobile, enquiry.email, enquiry.msg)
                },
            },
            'Subject': {
                'Charset': 'utf-8',
                'Data': 'Enqiry from the website',
            },
        },
        Source=config('from'),
    )

    print(response)

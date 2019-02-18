from celery import shared_task

from decouple import config
from .models import Report
import boto3

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)


@shared_task
def fetch_ses_sending_metrics():
    print('fetching sending statistics from the aws-ses')
    response = client.get_send_statistics()

    dataPoint = response['SendDataPoints']
    reports = []
    for x in dataPoint:
        time = x['Timestamp']
        sent = x['DeliveryAttempts']
        bounces = x['Bounces']
        complaints = x['Complaints']
        rejects = x['Rejects']

        reports.append(Report(
            time=time,
            sent=sent,
            bounces=bounces,
            complaints=complaints,
            rejects=rejects
        ))

    Report.objects.all().delete()
    Report.objects.bulk_create(reports)
    print('fetched ses metrics')


@shared_task
def print_simply():
    print('god of war man')

from celery import shared_task

from decouple import config
from .models import Report, Metrics
import boto3
from datetime import datetime, timedelta
from django.core import management

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)

# this func gets the aws email sending statistics 
# aws provides stats for past 14 days
# the stats are stored in reports table
# this func is run as a cron with the help of celery
# it best to run it func every 15 mins which is same 
# as the freq with which aws updates the metrics in the their db  
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

# just for testing
@shared_task
def print_simply():
    print('god of war man')

# creates a backup of the database with the setting provided at the server/settings.py
@shared_task
def dbbackup():
    management.call_command('dbbackup')
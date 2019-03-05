from celery import shared_task

from decouple import config
from .models import Report, Metrics
import boto3
from datetime import datetime, timedelta
from forex_python.converter import CurrencyRates

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)


@shared_task
def get_aws_cost():

    client = boto3.client(
        'ce',
        region_name='eu-west-1',
        aws_access_key_id=config('aws_key'),
        aws_secret_access_key=config('aws_secret')
    )

    start = datetime.now()-timedelta(days=30)
    end = datetime.now()

    start = start.strftime('%Y-%m-%d')
    end = end.strftime('%Y-%m-%d')

    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': start,
            'End': end
        },
        Granularity='MONTHLY',
        Metrics=[
            # 'BLENDED_COST', 'UNBLENDED_COST', 'AMORTIZED_COST', 'NET_UNBLENDED_COST', 'NET_AMORTIZED_COST', 'USAGE_QUANTITY', 'NORMALIZED_USAGE_AMOUNT'
            'UNBLENDED_COST'
        ],
    )

    response = response.get('ResultsByTime')[-1]

    curr_bill = response.get('Total').get('UnblendedCost').get('Amount')
    curr_bill = float(curr_bill)

    c = CurrencyRates()
    curr_bill = c.convert('USD', 'INR', curr_bill)
    try:
        metric = Metrics.objects.get(name='current_bill')
    except:
        metric = Metrics(name='current_bill')
    metric.value = curr_bill
    metric.save()

    print(metric.value)


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

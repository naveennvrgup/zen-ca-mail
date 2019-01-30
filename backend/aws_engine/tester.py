import boto3
from decouple import config

client = boto3.client(
    'ce',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)

res = client.get_cost_and_usage(
    TimePeriod={
        'Start': '2019-01-01',
        'End': '2019-01-28'
    },
    Granularity='MONTHLY',
    Metrics=['BlendedCost']
)
print(res)
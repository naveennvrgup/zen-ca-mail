import boto3
from decouple import config

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)


response = client.list_verified_email_addresses()
print(response)
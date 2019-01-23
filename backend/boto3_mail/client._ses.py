import boto3
from decouple import config

client = boto3.client(
    'ses',
    region_name=config('region_name'),
    aws_access_key_id=config('aws_access_key_id'),
    aws_secret_access_key=config('aws_secret_access_key')
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from decouple import config
import boto3

client = boto3.client(
    'ses',
    region_name='eu-west-1',
    aws_access_key_id=config('aws_key'),
    aws_secret_access_key=config('aws_secret')
)

@api_view(['get'])
def sending_statistics_view(req):
    response = client.get_send_statistics()
    return JsonResponse(response)
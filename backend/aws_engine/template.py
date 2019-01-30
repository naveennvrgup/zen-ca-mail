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
name = str(random.random())[2:]
response = client.create_template(
    Template={
        "TemplateName": name,
        "SubjectPart": "Greetings",
        "HtmlPart": "<h1>Hello </p>",
        "TextPart": "Dear ."
    }
)

print(response)

# response = client.get_template(
#     TemplateName='MyTemplate'
# )

# print(response)
email = 'naveennvrgup@gmail.com'
response = client.send_bulk_templated_email(
    Source=email,
    Template=name,
    Destinations=[
        {
            "Destination": {
                "ToAddresses": [
                    email,'zomatonns2@gmail.com'
                ]
            },
            "ReplacementTemplateData":"{}"
        }
    ],
    DefaultTemplateData="{}"
)

print(response)

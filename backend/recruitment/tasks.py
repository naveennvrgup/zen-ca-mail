from celery import shared_task
from decouple import config
import boto3


def get_html(key, value):
    if key in ['resume', 'passport_photo']:
        return '''
            <div>
                <b>{}: </b><span><a href='{}'>{}</a></span>
            </div>
        '''.format(key, value, value.split('/').pop())
    elif key == 'important':
        return ''
    else:
        return '''
            <div>
                <b>{}: </b><span>{}</span>
            </div>
        '''.format(key, value)


@shared_task
def send_job_form_mail(formdata):
    client = boto3.client(
        'ses',
        region_name='eu-west-1',
        aws_access_key_id=config('aws_key'),
        aws_secret_access_key=config('aws_secret')
    )

    formdata_keys = [
        'firstname',
        'middlename',
        'lastname',
        'gender',
        'phone',
        'email',
        'address',
        'district',
        'state',
        'nationality',
        'pincode',
        'passport_photo',
        'resume',
    ]

    body = ''

    for x in formdata_keys:
        body += get_html(x, formdata[x])

    response = client.send_email(
        Destination={
            'ToAddresses': [config('caemail')]
        },
        Message={
            'Body': {
                'Html': {
                    'Charset': 'utf-8',
                    'Data': body
                },
            },
            'Subject': {
                'Charset': 'utf-8',
                'Data': 'New career enquiry',
            },
        },
        Source=config('from'),
    )

    print(response)

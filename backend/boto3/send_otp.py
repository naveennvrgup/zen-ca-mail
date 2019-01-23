from .client import *
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart

from server.settings import emailFrom, send_rate, domain
from apanel.models import *

def verfication_mail(id):
    sub = Subcriber.objects.get(pk=int(id))

    # create email
    message = MIMEMultipart()
    message['From'] = emailFrom
    message['To'] = sub.email
    message['Subject'] = 'ca client verification otp'

    # message body
    body='otp: {}'.format(sub.otp)
    part = MIMEText(body, 'html')
    message.attach(part)

    response = client.send_raw_email(
        Source=emailFrom,
        Destinations=[sub.email],
        RawMessage={
            'Data': message.as_string()
        }
    )

    print(response)
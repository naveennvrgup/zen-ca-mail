from .client import *
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart

from threading import Timer 
from server.settings import emailFrom, send_rate, domain



def send_mail(sub,draft):
    # create email
    message = MIMEMultipart()
    message['From'] = emailFrom
    message['To'] = sub.email
    message['Subject'] = draft.subject

    # add the attachements to the body
    body=draft.body
    files = draft.files.all()

    if len(files):
        body+='<h3>Attachments:</h3>'

        for i in range(len(files)):
            body+='<div>{}/media/{}</div>'.format(domain,files[i].file.name)
            
    # message body
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

def bulk_mail(outbox,draft):
    sendq=outbox.sendq.all()
    
    draft.status = 1
    draft.save()

    for i in range(len(sendq)):
        Timer(i*send_rate,send_mail,(sendq[i],draft)).start()
    
    # update the draft
    draft.status = 2
    draft.save()
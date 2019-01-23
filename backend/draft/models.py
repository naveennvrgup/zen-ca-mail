from django.db.models import *
from rest_framework.serializers import ModelSerializer


class Attachment(Model):
    file = FileField(blank=True, default='', upload_to='attachments/%y-%m')

    def __str__(self):
        return self.file.name

        
class Draft(Model):
    subject = CharField(max_length=300)
    body = TextField()
    status = IntegerField(default=0)
    sentTo = CharField(max_length=100, default='')
    created_on = DateTimeField(auto_now_add=True)
    edited_on = DateField(auto_now=True)
    files = ManyToManyField(Attachment, related_name='drafts')

    def __str__(self):
        return self.subject

class AttachmentSerializer(ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'

class DraftSerializer(ModelSerializer):
    # files = DraftAttachmentsSerializer(many=True, read_only=True)

    class Meta:
        model = Draft
        fields = '__all__'
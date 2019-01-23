from django.db.models import *
from rest_framework.serializers import ModelSerializer


class Draft(Model):
    subject = CharField(max_length=300)
    body = TextField()
    status = IntegerField(default=0)
    sentTo = CharField(max_length=100, default='')
    created_on = DateTimeField(auto_now_add=True)
    edited_on = DateField(auto_now=True)

    def __str__(self):
        return self.subject


class DraftAttachments(Model):
    file = FileField(blank=True, default='', upload_to='attachments/%y-%m')
    draft = ForeignKey(Draft, on_delete=CASCADE, related_name='files')

    def __str__(self):
        return self.file.name

class DraftAttachmentsSerializer(ModelSerializer):
    class Meta:
        model = DraftAttachments
        fields = '__all__'

class DraftSerializer(ModelSerializer):
    files = DraftAttachmentsSerializer(many=True, read_only=True)

    class Meta:
        model = Draft
        fields = '__all__'
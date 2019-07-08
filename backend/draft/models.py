from django.db.models import *
from rest_framework.serializers import ModelSerializer
from django.dispatch import Signal


class Draft(Model):
    subject = CharField(default='', max_length=300)
    body = TextField(default='')
    status = IntegerField(default=0)
    sentTo = TextField(default='')
    created_on = DateTimeField(auto_now_add=True)
    edited_on = DateTimeField(auto_now=True)
    flag = BooleanField(default=False)
    group = TextField(default='')

    def __str__(self):
        return self.subject


class Attachment(Model):
    file = FileField(blank=True, default='', upload_to='attachments/%y-%m')
    draft = ForeignKey(Draft, on_delete=CASCADE, related_name='files', )
    flag = BooleanField(default=False)

    def __str__(self):
        return self.file.name


class AttachmentSerializer(ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'


class DraftSerializer(ModelSerializer):
    files = AttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = Draft
        fields = '__all__'

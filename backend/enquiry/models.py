from django.db.models import *
from rest_framework.serializers import ModelSerializer
from django.dispatch import receiver


class Enquiry(Model):
    name = CharField(max_length=300)
    mobile = CharField(max_length=300)
    email = EmailField()
    msg = TextField()

    def __str__(self):
        return self.name


class EnquirySerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Enquiry

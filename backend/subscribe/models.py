from django.db.models import *
from rest_framework.serializers import ModelSerializer

class Subscriber(Model):
    name = CharField(max_length=200)
    email = EmailField(unique=True)
    mobile = CharField(max_length=100)
    verified = BooleanField(default=False)
    bounces = IntegerField(default=0)
    otp = CharField(max_length=5, default='00000')
    created_on = DateTimeField(auto_now_add=True)
    flag = BooleanField(default=False)

    def __str__(self):
        return self.name

class SubscriberSerializer(ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'
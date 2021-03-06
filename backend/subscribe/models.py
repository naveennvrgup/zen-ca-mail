from django.db.models import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.dispatch import receiver

subscriber_status_choices = (
    ('available', 'available'),
    ('bounced', 'bounced'),
    ('complaint', 'complaint')
)


class Group(Model):
    name = CharField(max_length=200, unique=True)
    flag = BooleanField(default=False)
    created_on = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Subscriber(Model):
    name = CharField(max_length=200, default='anonymouse')
    email = EmailField()
    mobile = CharField(max_length=100, default='0000000000')
    verified = BooleanField(default=False)
    status = CharField(
        max_length=100, choices=subscriber_status_choices, default='available')
    otp = CharField(max_length=5, default='00000')
    created_on = DateTimeField(auto_now_add=True)
    flag = BooleanField(default=False)
    group = ForeignKey(Group, on_delete=CASCADE, related_name='subs')

    def __str__(self):
        return self.name


class SubscriberSerializer(ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'


class GroupSerializer(ModelSerializer):
    subs = SubscriberSerializer(required=False, many=True)

    class Meta:
        model = Group
        fields = '__all__'

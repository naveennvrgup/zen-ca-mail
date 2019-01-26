from django.db.models import *
from rest_framework.serializers import ModelSerializer
from django.dispatch import receiver


class Subscriber(Model):
    name = CharField(max_length=200, default='')
    email = EmailField()
    mobile = CharField(max_length=100, default='')
    verified = BooleanField(default=False)
    bounces = IntegerField(default=0)
    otp = CharField(max_length=5, default='00000')
    created_on = DateTimeField(auto_now_add=True)
    flag = BooleanField(default=False)

    def __str__(self):
        return self.name


class Group(Model):
    name = CharField(max_length=200, unique=True)
    subs = ManyToManyField(Subscriber, related_name='groups')
    flag = BooleanField(default=False)
    created_on = DateTimeField(auto_now_add=True)

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

# save all new subscribers in group all


@receiver(signals.post_save, sender=Subscriber)
def pre_save_outbox(sender, instance, **kwargs):
    Group.objects.get(name='all').subs.add(instance)


# create group all if not already exists
# try:
#     all = Group.objects.get(name='all')
#     if all:
#         print('group all exists')
# except:
#     all = Group.objects.create(name='all')
#     print('created group all')

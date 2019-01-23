from django.db.models import *
from rest_framework.serializers import ModelSerializer
from django.dispatch import receiver
from draft.models import *
from subscribe.models import *

class Outbox(Model):
    draft = CharField(max_length=100)
    subject = CharField(max_length=200, default='not yet updated')
    created_on = DateTimeField(auto_now_add=True)
    noSubs = IntegerField(default=0)
    bounces = IntegerField(default=0)
    complaints = IntegerField(default=0)

    def __str__(self):
        return self.subject


class SendQ(Model):
    email = CharField(max_length=100)
    msgId = CharField(max_length=100, default='no return yet')
    sent = BooleanField(default=False)
    status = CharField(max_length=100, default='delivery')
    outbox = ForeignKey(Outbox, on_delete=CASCADE, related_name='sendq')

    def __str__(self):
        return self.outbox.subject

class OutboxSerializer(ModelSerializer):
    class Meta:
        model = Outbox
        fields = '__all__'


# set amount of subs the email is sent to
@receiver(signals.pre_save, sender=Outbox)
def pre_save_outbox(sender, instance, **kwargs):
    draft = Draft.objects.get(id=int(instance.draft))
    instance.subject = draft.subject
    instance.noSubs = Subcriber.objects.count()

# 
@receiver(signals.post_save, sender=Outbox)
def post_save_outbox(sender, instance, **kwargs):
    draft = Draft.objects.get(id=int(instance.draft))
    try:
        subs = Subcriber.objects.all().filter(verified=True)
        print('sending bulkmail to {} subs '.format(len(subs)))
        # attach email to queue
        for i in range(len(subs)):
            newq = SendQ(email=subs[i].email, outbox=instance)
            newq.save()

        # send the mail
        bulk_mail(instance, draft)

    except:
        print('error fetching subs')
        pass

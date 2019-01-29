from django.db.models import *
from rest_framework.serializers import ModelSerializer
from django.dispatch import receiver
from draft.models import *
from subscribe.models import *
from decouple import config
import math


class Outbox(Model):
    draft = IntegerField()
    group = IntegerField()

    def __str__(self):
        return self.subject


class Batch(Model):
    draft = IntegerField(null=True)
    subs = ManyToManyField(Subscriber, related_name='batch')
    created_on = DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.draft)


class OutboxSerializer(ModelSerializer):
    class Meta:
        model = Outbox
        fields = '__all__'


# set amount of subs the email is sent to
@receiver(signals.post_save, sender=Outbox)
def post_save_outbox(sender, instance, **kwargs):
    draft = Draft.objects.get(pk=instance.draft)
    group = Group.objects.get(pk=instance.group)

    # change draft status to outbox
    draft.status = 2
    draft.save()

    # create batches 
    x = 1
    y = int(config('batch_size'))
    subs = group.subs.all()
    batched_subs = [subs[x*y-y:x*y] for x in range(1, math.ceil(len(subs)/y)+1)]
    for batch_of_subs in batched_subs:
        batch = Batch.objects.create(draft=draft.id)
        batch.subs.add(*batch_of_subs)
        
    print(subs)

from django.db import models
from rest_framework.serializers import ModelSerializer
from django.db.models import signals
from django.dispatch import receiver
from .tasks import send_job_form_mail

gender_choices = [['male']*2, ['female']*2]


class Recruitment(models.Model):
    firstname = models.CharField(max_length=200)
    middlename = models.CharField(max_length=200, blank=True)
    lastname = models.CharField(max_length=200)
    gender = models.CharField(choices=gender_choices, max_length=50)
    phone = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    address = models.TextField()
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    passport_photo = models.ImageField(upload_to='resume_photos')
    resume = models.FileField(upload_to='resumes')
    important = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class RecruitmentSerializer(ModelSerializer):
    class Meta:
        model = Recruitment
        fields = '__all__'


@receiver(signals.post_save, sender=Recruitment)
def create_customer(sender, instance, created, **kwargs):
    formdata = RecruitmentSerializer(instance).data
    send_job_form_mail.delay(formdata)

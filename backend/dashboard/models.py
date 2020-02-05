from django.db import models
from rest_framework.serializers import ModelSerializer

# stores the info sending stats from the aws
class Report(models.Model):
    time = models.DateTimeField()
    sent = models.IntegerField()
    rejects = models.IntegerField()
    complaints = models.IntegerField()
    bounces = models.IntegerField()

    def __str__(self):
        return str(self.time)

# this is useless model deprecated
class Metrics(models.Model):
    name = models.CharField(max_length=200)
    value = models.FloatField()


class ReportSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Report

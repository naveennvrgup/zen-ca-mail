from django.db import models
from rest_framework.serializers import ModelSerializer


class Report(models.Model):
    time = models.DateTimeField()
    sent = models.IntegerField()
    rejects = models.IntegerField()
    complaints = models.IntegerField()
    bounces = models.IntegerField()

    def __str__(self):
        return str(self.time)


class ReportSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Report

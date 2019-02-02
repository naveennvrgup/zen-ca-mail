from django.db import models


class Report(models.Model):
    time = models.DateTimeField()
    sent = models.IntegerField()
    rejects = models.IntegerField()
    complaints = models.IntegerField()
    bounces = models.IntegerField()

    def __str__(self):
        return str(self.time)

from django.contrib import admin
from .models import *

admin.site.register(Outbox)
admin.site.register(Batch)
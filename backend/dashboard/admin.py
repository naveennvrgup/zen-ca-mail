from django.contrib import admin
from .models import Report


class reportAdmin(admin.ModelAdmin):
    list_display = ('time', 'sent', 'rejects', 'complaints', 'bounces')


admin.site.register(Report, reportAdmin)

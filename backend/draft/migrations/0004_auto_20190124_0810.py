# Generated by Django 2.1.5 on 2019-01-24 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0003_auto_20190124_0800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='draft',
            name='body',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='draft',
            name='subject',
            field=models.CharField(default='', max_length=300),
        ),
    ]

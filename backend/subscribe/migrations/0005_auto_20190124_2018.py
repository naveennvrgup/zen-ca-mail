# Generated by Django 2.1.5 on 2019-01-24 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscribe', '0004_auto_20190124_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]

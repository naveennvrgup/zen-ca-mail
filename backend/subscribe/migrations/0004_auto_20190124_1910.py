# Generated by Django 2.1.5 on 2019-01-24 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscribe', '0003_auto_20190123_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriber',
            name='mobile',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='subscriber',
            name='name',
            field=models.CharField(default='', max_length=200),
        ),
    ]

# Generated by Django 2.1.5 on 2019-02-01 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscribe', '0007_auto_20190201_0945'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriber',
            name='mobile',
            field=models.CharField(default='0000000000', max_length=100),
        ),
        migrations.AlterField(
            model_name='subscriber',
            name='name',
            field=models.CharField(default='anonymouse', max_length=200),
        ),
    ]

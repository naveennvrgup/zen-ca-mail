# Generated by Django 2.1.5 on 2019-01-28 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_news_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='detail',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='news',
            name='link',
            field=models.URLField(blank=True),
        ),
    ]

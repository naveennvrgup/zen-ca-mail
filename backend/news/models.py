from django.db.models import *
from rest_framework.serializers import ModelSerializer

class News(Model):
    title = CharField(max_length=200)
    brief = TextField()
    detail = TextField(blank=True)
    link = URLField(blank=True)
    img = ImageField(blank=True)
    flag = BooleanField(default=False)
    created_on = DateTimeField(auto_now_add=True)
    edited_on = DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class NewsSerializer(ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
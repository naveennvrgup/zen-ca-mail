from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from django.http import JsonResponse

from .models import *
import json

class NewsViewset(ModelViewSet):
    queryset = News.objects.filter(flag=False)
    serializer_class = NewsSerializer
    filter_fields = ['show']

@api_view(['get'])
def get_news_categories_count_view(req):
    news = News.objects.filter(flag=False)
    res={}
    res['total'] = news.count()
    res['displayed'] = news.filter(show=True).count()
    res['archieved'] = news.filter(show=False).count()
    
    return JsonResponse(res)
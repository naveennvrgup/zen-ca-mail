from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend

from .models import *
import json


class NewsViewset(ModelViewSet):
    queryset = News.objects.filter(flag=False).reverse()
    serializer_class = NewsSerializer
    filter_fields = ['show']
    filter_backends = (DjangoFilterBackend,)


@api_view(['get'])
def get_news_categories_count_view(req):
    news = News.objects.filter(flag=False)
    res = {}
    res['total'] = news.count()
    res['displayed'] = news.filter(show=True).count()
    res['archieved'] = news.filter(show=False).count()

    return JsonResponse(res)


@api_view(['get'])
@permission_classes([AllowAny])
def get_news_view(req):
    news = News.objects.filter(flag=False, show=True)
    snews = NewsSerializer(news, many=True)
    return Response(snews.data)


# used to upload news imgs
@api_view(['post'])
def put_news_img_view(req):
    news = News.objects.get(pk=req.POST['nid'])
    news.img = req.FILES['img']
    news.save()

    snews = NewsSerializer(news)
    return Response(snews.data)

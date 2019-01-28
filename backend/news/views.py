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
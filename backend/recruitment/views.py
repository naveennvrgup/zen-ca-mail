from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend

from .models import *
import json


class RecruitmentViewset(ModelViewSet):
    queryset = Recruitment.objects.all()
    serializer_class = RecruitmentSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'
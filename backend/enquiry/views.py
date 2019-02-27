from server.settings import BASE_DIR
from django.http import HttpResponse
import os
from tempfile import NamedTemporaryFile
import csv
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import JSONParser

from decouple import config
from django.shortcuts import get_object_or_404
import json
from .models import *
from django.utils import timezone


@api_view(['post'])
@permission_classes([AllowAny])
def send_enquiry_view(req):
    data = JSONParser().parse(req)
    enqiry = Enquiry.objects.create(
        name=data.get('name'),
        email=data.get('email'),
        mobile=data.get('mobile'),
        msg=data.get('msg'),
    )

    senqiry = EnquirySerializer(enqiry)

    return Response(senqiry.data)

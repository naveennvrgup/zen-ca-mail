from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser

from .models import *
import json
from aws_engine.send_otp import *

class DraftViewset(ModelViewSet):
    queryset=Draft.objects.all()
    serializer_class=DraftSerializer

class AttachmentViewset(ModelViewSet):
    queryset=Attachment.objects.all()
    serializer_class=AttachmentSerializer
    parser_classes = (MultiPartParser,)
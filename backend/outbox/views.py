from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser

from .models import *
from draft.models import *
from subscribe.models import *
import json

class OutboxViewset(ModelViewSet):
    queryset=Outbox.objects.all()
    serializer_class=OutboxSerializer
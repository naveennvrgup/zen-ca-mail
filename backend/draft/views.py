from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser
from django.http import JsonResponse

from .models import *
import json
from aws_engine.send_otp import *

class DraftViewset(ModelViewSet):
    queryset=Draft.objects.all().filter(flag=False)
    serializer_class=DraftSerializer
    filter_fields='__all__'

class AttachmentViewset(ModelViewSet):
    queryset=Attachment.objects.all()
    serializer_class=AttachmentSerializer
    parser_classes = (MultiPartParser,)

@api_view(['get'])
def get_draft_categories_count_view(req):
    drafts = Draft.objects.filter(flag=False)
    res={}
    res['total'] = drafts.count()
    res['drafts'] = drafts.filter(status=0).count()
    res['outbox'] = drafts.filter(status=1).count()
    res['sent'] = drafts.filter(status=2).count()
    
    return JsonResponse(res)
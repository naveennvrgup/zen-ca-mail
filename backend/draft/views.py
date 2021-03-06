from .tasks import start_bulk_mail, handle_bounce_async, handle_complaint_async
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
from subscribe.models import *
import json


class DraftViewset(ModelViewSet):
    queryset = Draft.objects.all().filter(flag=False).reverse()
    serializer_class = DraftSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = '__all__'


class AttachmentViewset(ModelViewSet):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    filter_backends = (DjangoFilterBackend,)
    parser_classes = (MultiPartParser,)


@api_view(['get'])
def get_draft_categories_count_view(req):
    drafts = Draft.objects.filter(flag=False)
    res = {}
    res['total'] = drafts.count()
    res['drafts'] = drafts.filter(status=0).count()
    res['outbox'] = drafts.filter(status=1).count()
    res['sent'] = drafts.filter(status=2).count()

    return JsonResponse(res)


@api_view(['POST'])
def send_bulk_mail_view(req):
    data = JSONParser().parse(req)

    draft = Draft.objects.get(pk=data['draft'])
    draft.status = 1
    draft.save()

    # send the mail in async
    start_bulk_mail.delay(data['draft'], data['groups'])

    return Response({'success': True})


# when a bounce or complaint occurs aws sns will send info about it to this view
# handles the problem in async to improve performance
@api_view(['POST'])
@permission_classes([AllowAny])
def handle_complaint_view(req):
    data = JSONParser().parse(req)

    if data['Type'] == 'SubscriptionConfirmation':
        print(data)
        return Response()

    handle_complaint_async.delay(data['Message'])
    return Response('got the handle complaint subscription')


# when a bounce or complaint occurs aws sns will send info about it to this view
# handles the problem in async to improve performance
@api_view(['POST'])
@permission_classes([AllowAny])
def handle_bounce_view(req):
    data = JSONParser().parse(req)

    if data['Type'] == 'SubscriptionConfirmation':
        print(data)
        return Response()

    handle_bounce_async.delay(data['Message'])
    return Response('got the handle bounce subscription')


class get_bounces(ListAPIView):
    queryset = Subscriber.objects.filter(status='bounced', flag=True)
    filter_backends = (DjangoFilterBackend,)
    serializer_class = SubscriberSerializer


class get_complaints(ListAPIView):
    queryset = Subscriber.objects.filter(status='complaint', flag=True)
    filter_backends = (DjangoFilterBackend,)
    serializer_class = SubscriberSerializer


@api_view(['post'])
def forward_draft_view(req, id):
    old_draft_id = id
    old_draft = Draft.objects.get(pk=old_draft_id)

    new_draft = Draft()
    new_draft.subject = old_draft.subject
    new_draft.body = old_draft.body
    new_draft.save()

    old_files = old_draft.files.all()
    new_files = []

    for old_file_obj in old_files:
        file_obj = Attachment()
        file_obj.file = old_file_obj.file
        file_obj.draft = new_draft
        file_obj.save()

    return JsonResponse({
        'id': new_draft.id
    })

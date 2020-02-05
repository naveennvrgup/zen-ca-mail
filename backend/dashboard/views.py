from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import *
from draft.models import Draft
from subscribe.models import Subscriber
from news.models import News
from django.utils import timezone

# compiles and sends the sending stats provided by the aws
# for drawing the graph
@api_view(['get'])
def get_delivery_reports_view(req):
    reports = Report.objects.all()
    data = [{
        'sent': 0,
        'rejects': 0,
        'complaints': 0,
        'bounces': 0,
    } for x in range(15)]

    for x in reports:
        i = timezone.now() - x.time
        i = i.days

        data[i]['sent'] += x.sent
        data[i]['rejects'] += x.rejects
        data[i]['complaints'] += x.complaints
        data[i]['bounces'] += x.bounces

    return Response(data)

@api_view(['get'])
def get_draft_details_view(req):
    drafts = Draft.objects.filter(flag=False)
    drafts = [{
        'time': x.edited_on,
        'status': x.status,
        'sentTo': x.sentTo,
        'flag': x.flag
    } for x in drafts]
    return Response(drafts)

@api_view(['get'])
def subscribers_brief_view(req):
    subs = Subscriber.objects.filter(flag=False)

    return Response({
        'total': subs.count(),
        'flag': subs.filter(flag=True).count(),
        'noflag': subs.filter(flag=False).count(),
        'available': subs.filter(status='available').count(),
        'bounced': subs.filter(status='bounced').count(),
        'complaint': subs.filter(status='complaint').count()
    })


@api_view(['get'])
def drafts_brief_view(req):
    drafts = Draft.objects.filter(flag=False)

    return Response({
        'total': drafts.count(),
        'draft': drafts.filter(status=0).count(),
        'sending': drafts.filter(status=1).count(),
        'sent': drafts.filter(status=2).count(),
    })


@api_view(['get'])
def news_brief_view(req):
    news = News.objects.filter(flag=False)

    return Response({
        'total': news.count(),
        'flag': news.filter(flag=True).count(),
        'noflag': news.filter(flag=False).count(),
    })

# deprecated
@api_view(['get'])
def server_cost_view(req):
    cost = 0
    try:
        cost = Metrics.objects.get(name='current_bill').value
    except:
        pass

    return Response({'cost': cost})

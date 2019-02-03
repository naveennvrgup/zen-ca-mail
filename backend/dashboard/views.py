from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import *
from draft.models import Draft
from subscribe.models import Subscriber
from news.models import News


@api_view(['get'])
def get_delivery_reports_view(req):
    reports = Report.objects.all()
    sdata = ReportSerializer(reports, many=True)
    # import pdb; pdb.set_trace()
    return Response(sdata.data)


@api_view(['get'])
def get_draft_details_view(req):
    drafts = Draft.objects.all()
    drafts = [{
        'time': x.edited_on,
        'status': x.status,
        'sentTo': x.sentTo,
        'flag': x.flag
    } for x in drafts]
    return Response(drafts)


@api_view(['get'])
def subscribers_brief_view(req):
    subs = Subscriber.objects.all()

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
    drafts = Draft.objects.all()

    return Response({
        'total': drafts.count(),
        'draft': drafts.filter(status=0).count(),
        'sending': drafts.filter(status=1).count(),
        'sent': drafts.filter(status=2).count(),
    })


@api_view(['get'])
def news_brief_view(req):
    news = News.objects.all()

    return Response({
        'total': news.count(),
        'flag': news.filter(flag=True).count(),
        'noflag': news.filter(flag=False).count(),
    })

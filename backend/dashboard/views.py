from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import *
from draft.models import Draft


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

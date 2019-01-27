from server.settings import BASE_DIR
from django.http import HttpResponse
import os
from tempfile import NamedTemporaryFile
import csv
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet

from decouple import config
from django.shortcuts import get_object_or_404
import json
from .models import *
from django.utils import timezone


class SubscribeViewset(ModelViewSet):
    queryset = Subscriber.objects.all().filter(flag=False)
    serializer_class = SubscriberSerializer

    def delete(self, req, pk=None):
        data = json.loads(req.body)
        sub = get_object_or_404(Subscriber, pk=pk)
        sub.flag = True
        sub.save()
        return Response({})

    def create(self, req):
        data = json.loads(req.body)
        try:
            sub = Subcriber.objects.get(email=data['email'])

            # for testing purpose option of duplicate sub is given
            if bool(config('duplicate_subs')):
                return save_subscriber(data)
            else:
                return Response({
                    'id': sub.id,
                    'email': sub.email,
                    'verified': sub.verified
                })
        except:
            return save_subscriber(data)


class GroupViewset(ModelViewSet):
    queryset = Group.objects.all().filter(flag=False)
    serializer_class = GroupSerializer

    def list(self, req):
        groups = Group.objects.all()
        res = []
        for x in groups:
            res.append({
                'id': x.id,
                'name': x.name,
                'subs': x.subs.all().count()
            })
        return Response(res)

    def retrieve(self, request, pk=None):
        group = get_object_or_404(Group, pk=pk)
        subs = SubscriberSerializer(group.subs.all(), many=True)
        page = self.paginate_queryset(subs.data)
        return self.get_paginated_response(page)

    def create(self, req):
        data = json.loads(req.body)
        data = Group.objects.create(name=data['name'])

        return Response({
            'id': data.id,
            'name': data.name,
            'subs': len(data.subs.all())
            # 'subs': [x.id for x in data.subs.all()]
        })


@api_view(['POST'])
def add_sub_to_group_view(req):
    data = json.loads(req.body)
    data['name'] = data['name'] if data['name'] else 'anonymous'
    data['mobile'] = data['mobile'] if data['mobile'] else '1234512345'
    data['verified'] = True
    sub = SubscriberSerializer(data=data)

    if sub.is_valid():
        sub.save()
        group = Group.objects.get(pk=data['groupId'])
        group.subs.add(sub.data['id'])
        return Response(sub.data)
    else:
        return Response(sub.errors)


@api_view(['POST'])
def sub_as_csv_view(req):
    # parse the file
    group_id = req.POST['group_id']
    file = req.FILES['file']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    count = Subscriber.objects.count()
    ttime = timezone.now()

    # if all fields are present
    try:
        subs = [Subscriber(
            email=x['email'],
            name=x['name'],
            mobile=x['mobile'],
            verified=True
        ) for x in reader]
        subs = Subscriber.objects.bulk_create(subs)
        subs = Subscriber.objects.filter(created_on__gt=ttime)
        Group.objects.get(pk=group_id).subs.add(*subs)
        Group.objects.get(name='all').subs.add(*subs)
        # print(subs)
        return Response()
    except:
        return Response({
            'msg': 'all fields name should in lowercase with email compulsary'
        })


@api_view(['GET'])
def download_group_csv_view(req, gid):
    group = Group.objects.get(pk=gid)
    subs = group.subs.all()

    # convet to csv
    fs = ','.join(['id','email','name','mobile','created_on']) + '\n'
    fs += '\n'.join([','.join([
        str(x.id),
        str(x.email),
        str(x.name),
        str(x.mobile),
        str(x.created_on)
    ]) for x in subs])

    response = HttpResponse(fs, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=group-{}-{}.csv'.format(group.name,timezone.now().date())
    return response

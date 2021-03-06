from server.settings import BASE_DIR
from django.http import HttpResponse
import os
from tempfile import NamedTemporaryFile
import csv
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.parsers import JSONParser
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from decouple import config
from django.shortcuts import get_object_or_404, render
import json
from .models import *
from django.utils import timezone
from collections import defaultdict


class AllSubscribePagination(PageNumberPagination):
    page_size = 15
    # max_page_size = 15


    def get_paginated_response(self, data):
        return {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'page_no': self.page.number,
            'page_size': self.page_size,
            'subscribers': data,
        }


class AllSubscribeViewset(ModelViewSet):
    queryset = Subscriber.objects.all().reverse()
    serializer_class = SubscriberSerializer
    pagination_class = AllSubscribePagination
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    search_fields = ('email', 'name', 'mobile')


    def list(self, req):
        subscribers = self.get_queryset()

        
        # get the groups of the subscribers
        groups = Group.objects.all()
        groups = sorted(groups, key=lambda x: x.id,reverse=True)
        groups = {x.name:{
            'total_subs': x.subs.count(),
            # 'result': 0,
            'id':x.id
        } for x in groups}


        subscribers = self.filter_queryset(subscribers)
        # for x in subscribers: groups[x.group.name]['result'] +=1


        try:
            subscribers = subscribers.filter(group__id=int(self.request.query_params['group_id']))
        except:
            subscribers = subscribers.filter(group__name='Subscribers')


        #paginate the subscribers
        subscribers =  SubscriberSerializer(subscribers, many=True).data
        subscribers = self.paginate_queryset(subscribers)
        subscribers = self.get_paginated_response(subscribers)

        #return the paginated stuff
        return Response({
            **subscribers,
            'groups': groups
        })


class SubscribeViewset(ModelViewSet):
    queryset = Subscriber.objects.filter(flag=False).reverse()
    serializer_class = SubscriberSerializer
    filter_backends = (DjangoFilterBackend,)

# creates a sub sub
    def create(self, req):
        data = JSONParser().parse(req)

        # check for duplicates
        try:
            sub = Subcriber.objects.get(email=data['email'])

            # for testing purpose option of duplicate sub is given
            if config('duplicate_subs') == 'True':
                return save_subscriber(data)
            else:
                return Response({
                    'id': sub.id,
                    'email': sub.email,
                    'verified': True
                })
        except:
            return save_subscriber(data)


class GroupViewset(ModelViewSet):
    queryset = Group.objects.filter(flag=False)
    serializer_class = GroupSerializer
    filter_backends = (DjangoFilterBackend,)

    def list(self, req):
        groups = Group.objects.all()
        res = []
        for x in groups:
            res.append({
                'id': x.id,
                'name': x.name,
                'subs': x.subs.count()
            })
        return Response(res)

# provides a group of subs with pagination
    def retrieve(self, request, pk=None):
        group = get_object_or_404(Group, pk=pk)
        subs = SubscriberSerializer(group.subs.all(), many=True)
        page = self.paginate_queryset(subs.data)
        return self.get_paginated_response(page)

    def create(self, req):
        data = JSONParser().parse(req)
        data = Group.objects.create(name=data['name'])

        return Response({
            'id': data.id,
            'name': data.name,
            'subs': len(data.subs.all())
            # 'subs': [x.id for x in data.subs.all()]
        })


@api_view(['POST'])
def add_sub_to_group_view(req):
    data = JSONParser().parse(req)
    data['name'] = data['name'] if data['name'] else 'anonymous'
    data['mobile'] = data['mobile'] if data['mobile'] else '1234512345'
    data['verified'] = True
    data['group'] = data['groupId']

    sub = SubscriberSerializer(data=data)

    if sub.is_valid():
        sub.save()
        return Response(sub.data)
    else:
        return Response(sub.errors)


# is help the user upload list of subs as a csv file
@api_view(['POST'])
def sub_as_csv_view(req):
    # parse the file
    group_id = req.POST['group_id']
    file = req.FILES['file']
    decoded_file = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded_file)
    group = Group.objects.get(pk=group_id)

    # if all fields are present
    try:
        subs = [Subscriber(
            email=x['email'],
            name=x['name'],
            mobile=x['mobile'],
            verified=True,
            group=group
        ) for x in reader]
        subs = Subscriber.objects.bulk_create(subs)

        print(subs)
        return Response()
    except:
        return Response({
            'msg': 'all fields name should in lowercase with email compulsary'
        })


# download the particular group of subs as a csv
@api_view(['GET'])
@permission_classes([AllowAny])
def download_group_csv_view(req, gid):
    group = Group.objects.get(pk=gid)
    subs = group.subs.filter(flag=False)

    # convet to csv
    fs = ','.join(['id', 'email', 'name', 'mobile', 'created_on']) + '\n'
    fs += '\n'.join([','.join([
        str(x.id),
        str(x.email),
        str(x.name),
        str(x.mobile),
        str(x.created_on)
    ]) for x in subs])

    response = HttpResponse(fs, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=group-{}-{}.csv'.format(
        group.name, timezone.now().date())
    return response

# for subscribing for the index page
@api_view(['post'])
@permission_classes([AllowAny])
def sub_from_main_view(req):
    data = JSONParser().parse(req)
    group = Group.objects.get(name='Subscribers')
    try:
        sub = Subscriber.objects.get(email=data.get('email'))
        sub.flag = False
        sub.save()
        return Response({
            'error': 'You have already subscribed!'
        })
    except:
        sub = Subscriber.objects.create(
            group=group,
            name=data.get('name'),
            email=data.get('email'),
            mobile=data.get('mobile'),
            verified=True
        )
        return Response({
            'msg': 'You have successfully subscribed!'
        })

@api_view(['get'])
@permission_classes([AllowAny])
def unsubscribe_view(req):
    email = req.query_params['email']

    try:
        subscriber = Subscriber.objects.get(email=email)
        subscriber.delete()
    except:
        pass
    
    return render(req,'unsubscribe.html', {'email': email})


@api_view(['get'])
def find_duplicates(self,group_id):
    group = Group.objects.get(pk=group_id)

    dp = set()
    for x in group.subs.all():
        dp.add(x.email)
    
    return Response({
        'msg': 'Group {} has {} duplicates'.format(
            group.name,
            group.subs.count()-len(dp),
        )
    })


@api_view(['get'])
def delete_duplicates(self,group_id):
    group = Group.objects.get(pk=group_id)

    dp = set()
    to_delete = []
    for x in group.subs.all():
        if x.email not in dp:
            dp.add(x.email)
        else:
            to_delete.append(x)

    for x in to_delete:
        x.delete()

    return Response({
        'msg': '{} duplicates of group {} have been deleted.'.format(
            len(to_delete),
            group.name
        )
    })
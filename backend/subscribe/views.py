from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from .models import *
from django.forms import model_to_dict

import json
from decouple import config


def save_subscriber(data):
    data['verified'] = True
    serializer = SubscriberSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


class SubscribeViewset(ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

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
        
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet
from .models import *

import json
from decouple import config


def save_subscriber(data):
    data['verified'] = True
    serializer = SubcriberSerializer(data=data)
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
                save_subscriber(data)
            else:
                return Response({
                    'id': sub.id,
                    'email': sub.email,
                    'verified': sub.verified
                })
        except:
            save_subscriber(data)

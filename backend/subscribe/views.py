from .models import *

from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.viewsets import ModelViewSet

import json
from engine.sub_verification import *


class SubscribeViewset(ModelViewSet):
    queryset = Subcriber.objects.all()
    serializer_class = SubcriberSerializer

    def create(self,req):
        data = json.loads(req.body)
        try:
            sub = Subcriber.objects.get(email=data['email'])
            return Response({
                'id':sub.id,
                'email':sub.email,
                'verified':sub.verified
            })
        except:
            serializer = SubcriberSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)

from subscribe.views import *
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include

from subscribe.views import *
from draft.views import *
from outbox.views import *
from sent.views import *

router = DefaultRouter()
router.register('subscribe', SubscribeViewset)
router.register('draft', DraftViewset)
router.register('attachment', AttachmentViewset)


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include(router.urls))
]
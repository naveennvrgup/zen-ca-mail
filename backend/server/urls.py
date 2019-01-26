from subscribe.views import *
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from subscribe.views import *
from draft.views import *
from outbox.views import *
from sent.views import *

router = DefaultRouter()
router.register('subscribe', SubscribeViewset)
router.register('draft', DraftViewset)
router.register('attachment', AttachmentViewset)
router.register('group', GroupViewset)
# router.register('test',list_subs_of_group)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/add_sub_to_group/', add_sub_to_group_view),
    path('api/', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

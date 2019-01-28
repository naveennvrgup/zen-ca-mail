from subscribe.views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from subscribe.views import *
from draft.views import *
from outbox.views import *
from sent.views import *
from news.views import *

router = DefaultRouter()
router.register('subscribe', SubscribeViewset)
router.register('group', GroupViewset)
router.register('draft', DraftViewset)
router.register('attachment', AttachmentViewset)
router.register('news', NewsViewset)


urlpatterns = [
    path('master/', admin.site.urls),
    path('login/', obtain_auth_token),
    # group
    path('api/add_sub_to_group/', add_sub_to_group_view),
    path('api/sub_as_csv/', sub_as_csv_view),
    path('api/download_group_as_csv/<int:gid>/', download_group_csv_view),
    # draft
    path('api/get_draft_categories_count/', get_draft_categories_count_view),
    # news
    path('api/get_news_categories_count/',get_news_categories_count_view),

    # router
    path('api/', include(router.urls)),
]

# media urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# react
urlpatterns.append(re_path('', TemplateView.as_view(template_name="index.html")))
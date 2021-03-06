from subscribe.views import *
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

# all the routes stay here
# no separate route files as it is a very small project

from subscribe.views import *
from draft.views import *
from news.views import *
from dashboard.views import *
from enquiry.views import *
from recruitment.views import *

router = DefaultRouter()
router.register('subscribe', SubscribeViewset)
router.register('all_subs', AllSubscribeViewset)
router.register('group', GroupViewset)
router.register('draft', DraftViewset)
router.register('attachment', AttachmentViewset)
router.register('news', NewsViewset)
router.register('recuritment', RecruitmentViewset)
router.register('pdf', PDFViewset)


urlpatterns = [
    path('master/', admin.site.urls),
    path('login/', obtain_auth_token),
    # group
    path('api/add_sub_to_group/', add_sub_to_group_view),
    path('api/sub_from_main/', sub_from_main_view),
    path('api/sub_as_csv/', sub_as_csv_view),
    path('api/download_group_as_csv/<int:gid>/', download_group_csv_view),
    path('unsubscribe/', unsubscribe_view),
    path('api/bounced_mails/', get_bounces.as_view()),
    path('api/complaint_mails/', get_complaints.as_view()),
    path('api/find_duplicates/<int:group_id>/', find_duplicates),
    path('api/delete_duplicates/<int:group_id>/', delete_duplicates),
    # draft
    path('api/get_draft_categories_count/', get_draft_categories_count_view),
    path('api/send_bulk_mail/', send_bulk_mail_view),
    path('api/forward_mail/<int:id>/', forward_draft_view),
    # aws metrics
    path('api/handle_bounce/', handle_bounce_view),
    path('api/handle_complaint/', handle_complaint_view),
    # news
    path('api/get_news_categories_count/', get_news_categories_count_view),
    path('api/get_news/', get_news_view),
    path('api/put_news_img/', put_news_img_view),
    # dashboard
    path('api/get_delivery_reports/', get_delivery_reports_view),
    path('api/get_draft_details/', get_draft_details_view),
    path('api/subscribers_brief/', subscribers_brief_view),
    path('api/drafts_brief/', drafts_brief_view),
    path('api/news_brief/', news_brief_view),
    path('api/server_cost/', server_cost_view),
    # pdfs
    path('api/pdf5/', PDF5_view),
    # enquiry
    path('api/send_enquiry/', send_enquiry_view),
    # router
    path('api/', include(router.urls)),
]

# media urls
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# react / all the routes except the above will be pointed to the frontend
# this is becoz react takes care of the routing  of the frontend
urlpatterns.append(
    re_path('', TemplateView.as_view(template_name="index.html")))

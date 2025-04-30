from rest_framework.routers import DefaultRouter
from .admin_views import AdminMessageViewSet
from .messaging_views import UserMessageListView
from django.urls import path

router = DefaultRouter()
router.register('admin/messages/', AdminMessageViewSet,
                basename='admin-messages')
urlpatterns = [
    path('view/', UserMessageListView.as_view(), name='user-messages')
]

urlpatterns += router.urls

# routers
from django.urls import path
# from rest_framework.routers import DefaultRouter
from .cars_views import CarListView, CarDetailView

# router = DefaultRouter()
# router.register(r'cars', CarViewSet)

urlpatterns = [
    path('list/', CarListView.as_view(), name='cars-list'),
    path('detail/', CarDetailView.as_view(), name='car-detail'),
]
# urlpatterns += router.urls

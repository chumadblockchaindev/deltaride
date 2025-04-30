from rest_framework.routers import DefaultRouter
from .admin_views import AdminBookingViewSet, AdminBrandViewSet, AdminTestimonialViewSet, UserListView, AdminDashboardView, AdminCarViewSet
from django.urls import path

router = DefaultRouter()

router.register(r'admin/brands', AdminBrandViewSet, basename='admin-brands')
router.register(r'admin/cars', AdminCarViewSet, basename='admin-cars')
router.register('admin/bookings', AdminBookingViewSet)
router.register('admin/testimonials', AdminTestimonialViewSet)

urlpatterns = [
    path('admin/users/', UserListView.as_view()),
    path('admin/dashboard/', AdminDashboardView.as_view()),
]

urlpatterns = router.urls

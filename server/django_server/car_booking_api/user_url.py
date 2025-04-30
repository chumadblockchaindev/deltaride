from django.urls import path
from .views import RegisterView, UpdateProfileView, ChangePasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/update/', UpdateProfileView.as_view(), name='update-profile'),
    path('password/change/', ChangePasswordView.as_view(), name='change-password'),
]

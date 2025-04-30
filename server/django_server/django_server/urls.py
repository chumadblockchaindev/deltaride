"""
URL configuration for django_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/auth/token/refresh/',
         TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
]
# Djoser Endpoint | Method | Description
# /api/auth/users/reset_password/ | POST | Send reset email (email)
# /api/auth/users/reset_password_confirm/ | POST | Confirm reset with uid, token, new_password

urlpatterns += [
    path('api/message/', include('car_booking_api.messaging_url')),
    path('api/testimonials/', include('car_booking_api.testimonials_url')),
    path('api/user/', include('car_booking_api.user_url')),
    path('api/cars/', include('car_booking_api.cars_url')),
    path('api/booking/', include('car_booking_api.bookings_url')),
    path('api/admin/', include('car_booking_api.admin_url')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

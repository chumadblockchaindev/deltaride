from django.urls import path
from .bookings_views import CreateBookingView, UserBookingHistoryView

urlpatterns = [
    path('book/', CreateBookingView.as_view(), name='book-car'),
    path('history/', UserBookingHistoryView.as_view(), name='booking-history'),
]

from rest_framework import viewsets, generics
from .models import Brand, Car, Booking, User, Testimonial, ContactMessage, Message
from .serializers import BrandSerializer, CarSerializer, BookingSerializer, UserSerializer, TestimonialSerializer, ContactMessageSerializer, MessageSerializer
from .permissions import IsAdminUserCustom
from rest_framework.views import APIView
from rest_framework.response import Response


class AdminBrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAdminUserCustom]


class AdminCarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAdminUserCustom]


class AdminBookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUserCustom]


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUserCustom]


class AdminTestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminUserCustom]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminUserCustom]


class AdminDashboardView(APIView):
    permission_classes = [IsAdminUserCustom]

    def get(self, request):
        data = {
            'users_count': User.objects.count(),
            'bookings_count': Booking.objects.count(),
            'subscribers_count': ContactMessage.objects.count(),
            'testimonials_count': Testimonial.objects.count(),
        }
        return Response(data)


class AdminMessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer
    permission_classes = [IsAdminUserCustom]

    def perform_create(self, serializer):
        if serializer.validated_data.get("is_global", False):
            serializer.save(recipient=None)  # Global message
        else:
            serializer.save()

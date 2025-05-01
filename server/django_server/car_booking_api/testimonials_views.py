from rest_framework import generics, permissions
from .models import Testimonial
from .serializers import TestimonialSerializer


class CreateTestimonialView(generics.CreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PublicTestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(active=True)
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

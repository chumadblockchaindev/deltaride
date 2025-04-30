from django.urls import path
from .testimonials_views import CreateTestimonialView, PublicTestimonialListView

urlpatterns = [
    path('post/', CreateTestimonialView.as_view(),
         name='post-testimonial'),
    path('testimonials/', PublicTestimonialListView.as_view(),
         name='public-testimonials'),
]

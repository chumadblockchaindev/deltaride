from rest_framework import generics, permissions
from .models import Message
from .serializers import MessageSerializer


class UserMessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(recipient=self.request.user) | Message.objects.filter(is_global=True)

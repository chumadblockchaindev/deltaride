# cars/views.py
from rest_framework import generics, permissions, status
from .models import Car
from .serializers import CarSerializer
from rest_framework.response import Response


# class CarViewSet(viewsets.ModelViewSet):
#     queryset = Car.objects.all()
#     serializer_class = CarSerializer

#     def get_permissions(self):
#         if self.action in ['create', 'update', 'destroy']:
#             return [IsAdminUser()]
#         return [AllowAny()]


class CarListView(generics.ListAPIView):
    queryset = Car.objects.filter(available=True)
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated]


class CarDetailView(generics.GenericAPIView):
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        car_id = request.data.get('car_id')

        if not car_id:
            return Response({"error": "Car ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"error": "Car not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(car)
        return Response(serializer.data, status=status.HTTP_200_OK)

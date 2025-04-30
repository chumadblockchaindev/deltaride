from rest_framework import serializers
from .models import CustomUser, Brand, Car, Booking, Testimonial, ContactMessage, Message
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'full_name', 'password')

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'full_name', 'username']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(), source='brand', write_only=True
    )

    class Meta:
        model = Car
        fields = ['id', 'brand', 'brand_id', 'model_name', 'year',
                  'price_per_day', 'available', 'image']


class BookingSerializer(serializers.ModelSerializer):
    car = serializers.StringRelatedField()  # Or nested serializer

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'status']


class TestimonialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testimonial
        fields = ['content']


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['full_name', 'username', 'email']


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

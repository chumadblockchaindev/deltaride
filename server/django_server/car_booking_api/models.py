from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


User = get_user_model()


class Brand(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Car(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='cars/')
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.brand.name} {self.model_name} ({self.year})"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car_id = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)


class Testimonial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    recipient = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_global = models.BooleanField(default=False)

    def __str__(self):
        return f"To: {'All' if self.is_global else self.recipient.email} - {self.content[:30]}"

from django.contrib import admin
from .models import Brand, Car, Booking, Testimonial, ContactMessage, Message, CustomUser
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'full_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'groups')
    search_fields = ('email', 'username', 'full_name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'full_name', 'password')}),
        ('Permissions', {'fields': ('is_staff',
         'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'full_name', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )


admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['brand', 'model_name', 'year',
                    'price_per_day', 'available']
    list_filter = ['available', 'brand']
    search_fields = ['model_name', 'year']
    list_editable = ['available']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'car_id', 'start_date', 'end_date', 'status']
    list_filter = ['status']
    search_fields = ['user__email', 'car__model_name']
    list_editable = ['status']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['user', 'content', 'active', 'created_at']
    list_filter = ['active']
    list_editable = ['active']
    search_fields = ['user__email', 'content']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'message', 'created_at']
    search_fields = ['name', 'email']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['recipient', 'content', 'is_global', 'created_at']
    list_filter = ['is_global']
    search_fields = ['recipient__email', 'content']


# @admin.register(User)
# class UserAdmin(BaseUserAdmin):
#     list_display = ('email', 'full_name', 'is_superuser', 'is_active')
#     search_fields = ('email', 'full_name')
#     ordering = ('email',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Personal info', {'fields': ('full_name',)}),
#         ('Permissions', {'fields': ('is_active',
#          'is_superuser', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login',)}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'full_name', 'password1', 'password2'),
#         }),
#     )

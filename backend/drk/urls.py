from django.contrib import admin
from django.urls import path, include  # Добавляем include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('user-profile/', include('UserProfile.urls')),  # Подключаем маршруты приложения user-profile
]

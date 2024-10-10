#UserProfile/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', UserProfileViewSet.as_view({'get': 'list', 'post': 'update'})),  # Для работы с профилем
    path('fields/', UserProfileMetadataViewSet.as_view({'get': 'list'})),  # Для получения метаданных модели
]
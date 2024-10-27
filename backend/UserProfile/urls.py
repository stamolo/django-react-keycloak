from django.urls import path
from .views import *

urlpatterns = [
    path('', UserProfileViewSet.as_view({'get': 'list', 'post': 'update'})),  # Для работы с профилем
    path('fields/', UserProfileMetadataViewSet.as_view({'get': 'list'})),  # Для получения метаданных модели
    # Измените путь для использования keycloak_id
    path('<str:keycloak_id>/', UserProfileViewSet.as_view({'patch': 'partial_update'})),  # Добавление PATCH по keycloak_id
]

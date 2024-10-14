from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserProfileViewSet, UserProfileMetadataViewSet

router = DefaultRouter()
router.register(r'profiles', UserProfileViewSet)

urlpatterns = router.urls + [
    path('fields/', UserProfileMetadataViewSet.as_view({'get': 'list'})),  # Для получения метаданных модели
]

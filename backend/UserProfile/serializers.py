from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        # Автоматически используем все поля модели, кроме keycloak_id
        exclude = ['keycloak_id']

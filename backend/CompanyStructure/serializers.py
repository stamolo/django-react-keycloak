from rest_framework import serializers
from .models import Company, Management, Department, Position, Employment

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class ManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Management
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'

class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = '__all__'

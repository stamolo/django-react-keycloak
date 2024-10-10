from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ManagementViewSet, DepartmentViewSet, PositionViewSet

router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'managements', ManagementViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'positions', PositionViewSet)

urlpatterns = router.urls

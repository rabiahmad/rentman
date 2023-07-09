from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rentals import views


router = DefaultRouter()
router.register(r"tenants", views.TenantViewSet)
router.register(r"landlords", views.LandlordViewSet)
router.register(r"properties", views.PropertyViewSet)
router.register(r"tenancies", views.TenancyViewSet)

app_name = "rentals"

urlpatterns = [
    path("", include(router.urls)),
    path("property_types/", views.property_type_list, name="property_types"),
    path("titles/", views.title_list, name="titles"),
]

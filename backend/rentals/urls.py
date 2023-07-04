from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rentals import views


router = DefaultRouter()
router.register(r"tenants", views.TenantViewSet)
router.register(r"landlords", views.LandlordViewSet)
router.register(r"properties", views.PropertyViewSet)
router.register(r"tenancies", views.TenancyViewSet)
# router.register(r"property_types", views.property_type_list)

app_name = "rentals"

urlpatterns = [
    path("", include(router.urls)),
    path("property_types/", views.property_type_list, name="property_types"),
]

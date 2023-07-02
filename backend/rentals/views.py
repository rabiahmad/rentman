from .models import Tenant, Landlord, Property, Tenancy
from .serializers import (
    TenantSerializer,
    LandlordSerializer,
    PropertySerializer,
    TenancySerializer,
)
from rest_framework import viewsets, permissions


class TenantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tenants to be viewed or edited.
    """

    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LandlordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Landlords to be viewed or edited.
    """

    queryset = Landlord.objects.all()
    serializer_class = LandlordSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Properties to be viewed or edited.
    """

    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TenancyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tenancies to be viewed or edited.
    """

    queryset = Tenancy.objects.all()
    serializer_class = TenancySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

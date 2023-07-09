from .models import BasePerson, Tenant, Landlord, Property, Tenancy
from .serializers import (
    TenantSerializer,
    LandlordSerializer,
    PropertySerializer,
    TenancySerializer,
    PropertyTypeSerializer,
    TitleSerializer,
)
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view


class TenantViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Tenants to be viewed or edited.
    """

    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


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


@api_view(["GET"])
def property_type_list(request):
    property_types = [choice[0] for choice in Property.PropertyType.choices]
    data = {"property_type": property_types}
    serializer = PropertyTypeSerializer(data=data)
    serializer.is_valid()
    return Response(serializer.data)


@api_view(["GET"])
def title_list(request):
    titles = [choice[0] for choice in Tenant.Title.choices]
    data = {"title": titles}
    serializer = TitleSerializer(data=data)
    serializer.is_valid()
    return Response(serializer.initial_data)

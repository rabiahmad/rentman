from .models import BasePerson, Tenant, Landlord, Property, Tenancy, Contractor
from .serializers import (
    TenantSerializer,
    LandlordSerializer,
    PropertySerializer,
    TenancySerializer,
    ContractorSerializer,
    PropertyTypeSerializer,
    TitleSerializer,
    ContractorTypeSerializer,
    ContractorServiceTypeSerializer,
)
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.views import APIView


class APIRootView(APIView):
    def get(self, request, format=None):
        data = {
            "tenants": reverse("rentals:tenant-list", request=request, format=format),
            "landlords": reverse(
                "rentals:landlord-list", request=request, format=format
            ),
            "properties": reverse(
                "rentals:property-list", request=request, format=format
            ),
            "tenancies": reverse(
                "rentals:tenancy-list", request=request, format=format
            ),
            "contractors": reverse(
                "rentals:contractor-list", request=request, format=format
            ),
            "property_types": reverse(
                "rentals:property_types", request=request, format=format
            ),
            "titles": reverse("rentals:titles", request=request, format=format),
            "contractor_types": reverse(
                "rentals:contractor_types", request=request, format=format
            ),
            "contractor_service_types": reverse(
                "rentals:contractor_service_types", request=request, format=format
            ),
        }
        return Response(data)


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
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


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
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ContractorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Contractors to be viewed or edited.
    """

    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


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


@api_view(["GET"])
def contractor_type(request):
    contractor_types = [choice[0] for choice in Contractor.ContractorType.choices]
    data = {"contractor_type": contractor_types}
    serializer = ContractorTypeSerializer(data=data)
    serializer.is_valid()
    return Response(serializer.initial_data)


@api_view(["GET"])
def contractor_service_type(request):
    service_types = [choice[0] for choice in Contractor.ServiceType.choices]
    data = {"service_type": service_types}
    serializer = ContractorServiceTypeSerializer(data=data)
    serializer.is_valid()
    return Response(serializer.initial_data)

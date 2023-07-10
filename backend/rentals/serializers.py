from rest_framework import serializers
from .models import Tenant, Landlord, Property, Tenancy, Contractor


class TenantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tenant
        fields = fields = [
            "id",
            "title",
            "first_name",
            "middle_name",
            "last_name",
            "phone",
            "email",
            "notes",
        ]


class LandlordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Landlord
        fields = fields = [
            "id",
            "title",
            "first_name",
            "middle_name",
            "last_name",
            "phone",
            "email",
            "notes",
        ]


class PropertySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Property
        fields = [
            "id",
            "house_number",
            "street",
            "town",
            "postcode",
            "property_type",
            # "landlord",
        ]


# TODO figure out why HyperlinkModelSerializer cant be used
class TenancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenancy
        fields = [
            "id",
            "property",
            "start_date",
            "end_date",
            "rent",
            "landlord",
            "tenants",
        ]


class PropertyTypeSerializer(serializers.Serializer):
    property_type = serializers.CharField()


class TitleSerializer(serializers.Serializer):
    title = serializers.CharField()


class ContractorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contractor
        fields = [
            "id",
            "contractor_type",
            "service_type",
            "company_name",
            "first_name",
            "last_name",
            "phone",
            "email",
            "website",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get("contractor_type") == Contractor.ContractorType.PERSON:
            data.pop("company_name")
        else:
            data.pop("first_name")
            data.pop("last_name")
        return data


class ContractorTypeSerializer(serializers.Serializer):
    contractor_type = serializers.CharField()


class ContractorServiceTypeSerializer(serializers.Serializer):
    service_type = serializers.CharField()

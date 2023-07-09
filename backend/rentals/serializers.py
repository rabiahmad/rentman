from rest_framework import serializers
from .models import Tenant, Landlord, Property, Tenancy


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

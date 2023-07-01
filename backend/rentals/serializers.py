from rest_framework import serializers
from .models import Tenant, Landlord, Property, Tenancy


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = "__all__"


class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


class TenancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenancy
        fields = "__all__"

from django.contrib import admin
from .models import Tenant, Landlord, Property, Tenancy, Contractor

admin.site.register(Tenant)
admin.site.register(Landlord)
admin.site.register(Property)
admin.site.register(Tenancy)
admin.site.register(Contractor)

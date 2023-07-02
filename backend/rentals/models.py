from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from datetime import datetime


class Property(models.Model):
    class Meta:
        verbose_name_plural = "Properties"

    house_number = models.TextField(null=False, blank=False)
    street = models.TextField(null=False, blank=False)
    town = models.TextField(null=False, blank=False)
    postcode = models.TextField(
        max_length=8, blank=False, null=False
    )  # TODO add regex validation for postcode

    class PropertyType(models.TextChoices):
        STUDIO = "Studio"
        FLAT = "Flat"
        MAISONETTE = "Maisonette"
        TERRACE = "Terrace"
        END_OF_TERRACE = "End terrace"
        BUNGALOW = "Bungalow"
        COTTAGE = "Cottage"
        SEMI_DETACHED = "Semi-detached"
        DETATCHED = "Detached"
        MANSION = "Mansion"

    property_type = models.CharField(
        choices=PropertyType.choices, max_length=50, null=False, blank=False
    )

    def __str__(self):
        return " ".join([self.house_number, self.street])


class BasePerson(models.Model):
    class Title(models.TextChoices):
        MR = "Mr"
        MS = "Ms"
        MRS = "Mrs"
        MISS = "Miss"
        DR = "Dr"

    title = models.CharField(choices=Title.choices, max_length=4)
    first_name = models.TextField(null=False, blank=False)
    middle_name = models.TextField(null=True, blank=True)
    last_name = models.TextField(null=False, blank=False)
    phone = PhoneNumberField()  # TODO add regex validations for phone numbers
    email = models.EmailField(null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        middle_name = self.middle_name if self.middle_name else ""
        return " ".join([self.title, self.first_name, middle_name, self.last_name])


class Tenant(BasePerson):
    pass


class Landlord(BasePerson):
    pass


class Tenancy(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField(null=False, blank=False, default=datetime.now())
    end_date = models.DateField(
        null=False, blank=False
    )  # TODO on save default to 12 months after start date
    rent = models.FloatField()
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE)
    tenants = models.ManyToManyField(Tenant)

    class Meta:
        verbose_name_plural = "Tenancies"
        ordering = ["start_date"]

    def __str__(self):
        fields_to_concat = [
            self.property,
            self.start_date,
            self.end_date,
        ]

        return " / ".join([str(f) for f in fields_to_concat])

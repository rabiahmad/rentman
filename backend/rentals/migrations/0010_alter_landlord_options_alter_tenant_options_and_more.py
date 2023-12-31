# Generated by Django 4.2.2 on 2023-07-09 10:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("rentals", "0009_landlord_notes_tenant_notes_alter_tenancy_start_date"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="landlord",
            options={"ordering": ["first_name", "last_name"]},
        ),
        migrations.AlterModelOptions(
            name="tenant",
            options={"ordering": ["first_name", "last_name"]},
        ),
        migrations.AlterField(
            model_name="landlord",
            name="email",
            field=models.EmailField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="landlord",
            name="first_name",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="landlord",
            name="last_name",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="landlord",
            name="middle_name",
            field=models.TextField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="property",
            name="house_number",
            field=models.TextField(max_length=10),
        ),
        migrations.AlterField(
            model_name="property",
            name="street",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="property",
            name="town",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="tenancy",
            name="start_date",
            field=models.DateField(
                default=datetime.datetime(2023, 7, 9, 11, 34, 35, 80778)
            ),
        ),
        migrations.AlterField(
            model_name="tenant",
            name="email",
            field=models.EmailField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name="tenant",
            name="first_name",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="tenant",
            name="last_name",
            field=models.TextField(max_length=50),
        ),
        migrations.AlterField(
            model_name="tenant",
            name="middle_name",
            field=models.TextField(blank=True, max_length=50, null=True),
        ),
    ]

# Generated by Django 4.2.2 on 2023-07-08 20:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("rentals", "0008_alter_property_landlord_alter_tenancy_start_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="landlord",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="tenant",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="tenancy",
            name="start_date",
            field=models.DateField(
                default=datetime.datetime(2023, 7, 8, 21, 57, 53, 822192)
            ),
        ),
    ]

# Generated by Django 4.2.2 on 2023-07-02 20:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("rentals", "0005_alter_tenancy_start_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tenancy",
            name="start_date",
            field=models.DateField(
                default=datetime.datetime(2023, 7, 2, 21, 6, 0, 157002)
            ),
        ),
    ]

# Generated by Django 4.0.1 on 2022-03-23 21:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_patients_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patients',
            name='request_user_name',
        ),
    ]
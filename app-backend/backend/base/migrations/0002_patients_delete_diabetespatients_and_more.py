# Generated by Django 4.0.1 on 2022-03-22 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patients',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=50)),
                ('patient_age', models.IntegerField()),
                ('patient_phone', models.CharField(max_length=11)),
                ('patient_gender', models.CharField(max_length=6)),
                ('patient_status', models.CharField(max_length=10)),
                ('request_user_name', models.CharField(max_length=100)),
                ('disease', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='DiabetesPatients',
        ),
        migrations.DeleteModel(
            name='HeartPatients',
        ),
    ]
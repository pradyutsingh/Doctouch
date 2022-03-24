from statistics import mode
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Patients(models.Model):
    # _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    patient_name = models.CharField(max_length=50)
    patient_age = models.IntegerField()
    patient_phone = models.CharField(max_length=11)
    patient_gender = models.CharField(max_length=6)
    patient_status = models.CharField(max_length=10)
    disease = models.CharField(max_length=50)

    def __str__(self):
        return self.patient_name


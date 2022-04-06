from django.http import HttpResponse, JsonResponse
import pickle
from rest_framework.decorators import api_view
import os
from base.apps import BaseConfig
from rest_framework.response import Response
from base.models import Patient
from django.core import serializers
from django.http import HttpResponse

@api_view(["GET"])
def getDiabetesPatients(request):
    requser = request.user
    qs = Patient.objects.all().filter(user = requser).exclude(patient_status = "Safe").filter(disease = "Diabetes")
    data = list(qs.values())
    return JsonResponse(data, safe=False)

@api_view(["POST"])
def predictDiabetesCondition(request):
    print("here in predict")
    data = request.data
    user = request.user
    PatientName = data["PatientName"]
    PhoneNum = data["PhoneNum"]
    Sex = data['Sex']

    Pregnancies = data['Pregnancies']
    Glucose = data['Glucose']
    BloodPressure = data['BloodPressure']
    SkinThickness = data['SkinThickness']
    Insulin = data['Insulin']
    BMI = data['BMI']
    DiabetesPedigreeFunction = data['DiabetesPedigreeFunction']
    Age = data['Age']

    toPredict = [[
        Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age
    ]]
    diabetes_model = BaseConfig.diabetes_model
    pred = diabetes_model.predict(toPredict)[0]
    response_dict = {"Condition": pred}

    gender_save = "Male" if Sex == "M" else "Female"
    status_save = "Unsafe" if pred == 1 else "Safe"

    patient = Patient.objects.create(
        user = user,
        patient_name = PatientName,
        patient_age = Age,
        patient_phone = PhoneNum,
        patient_gender =gender_save,
        patient_status = status_save,
        disease = "Diabetes" if status_save == "Unsafe" else "None"
    )

    return Response(response_dict, status=200)

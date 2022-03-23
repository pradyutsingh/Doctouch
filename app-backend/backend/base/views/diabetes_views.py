from django.http import HttpResponse
import pickle
from rest_framework.decorators import api_view
import os
from base.apps import BaseConfig
from rest_framework.response import Response


@api_view(["POST"])
def predictDiabetesCondition(request):
    print("here in predict")
    data = request.data
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
    print("pred is")
    print(pred)
    response_dict = {"Condition": pred}
    return Response(response_dict, status=200)

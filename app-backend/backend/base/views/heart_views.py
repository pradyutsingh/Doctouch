from django.http import HttpResponse
from sklearn.preprocessing import LabelEncoder
import pickle
from rest_framework.decorators import api_view
import os
from base.apps import BaseConfig
from rest_framework.response import Response
# from base.models import Patients


def load_encoder(save_path):
    pkl_file = open(save_path, 'rb')
    encoder = pickle.load(pkl_file)
    pkl_file.close()
    return encoder


@api_view(["POST"])
def predictHeartCondition(request):
    print("here in predict")
    data = request.data
    user = request.user
    print(user)
    PatientName = data["PatientName"]
    PhoneNum = data["PhoneNum"]

    Age = data['Age']
    Sex = data['Sex']
    ChestPainType = data['ChestPainType']
    RestingBP = data['RestingBP']
    Cholesterol = data['Cholesterol']
    FastingBS = data['FastingBS']
    RestingECG = data['RestingECG']
    MaxHR = data['MaxHR']
    ExerciseAngina = data['ExerciseAngina']
    Oldpeak = data['Oldpeak']
    ST_Slope = data['ST_Slope']
    # x = os.path.join(BaseConfig.ENCODER_FILE, "ChestPainType_encoder.pkl")
    # print(x)
    ChestPainType_encoder = load_encoder(os.path.join(
        BaseConfig.ENCODER_FILE, "ChestPainType_encoder.pkl"))
    Resting_ECG_encoder = load_encoder(os.path.join(
        BaseConfig.ENCODER_FILE, "Resting_ECG_encoder.pkl"))
    Sex_encoder = load_encoder(os.path.join(
        BaseConfig.ENCODER_FILE, "Sex_encoder.pkl"))
    ExerciseAngina_encoder = load_encoder(os.path.join(
        BaseConfig.ENCODER_FILE, "ExerciseAngina_encoder.pkl"))
    ST_Slope_encoder = load_encoder(os.path.join(
        BaseConfig.ENCODER_FILE, "ST_Slope_encoder.pkl"))

    print(type(ChestPainType_encoder))

    ChestPainType = ChestPainType_encoder.transform([ChestPainType])[0]
    RestingECG = Resting_ECG_encoder.transform([RestingECG])[0]
    Sex = Sex_encoder.transform([Sex])[0]
    ExerciseAngina = ExerciseAngina_encoder.transform([ExerciseAngina])[0]
    ST_Slope = ST_Slope_encoder.transform([ST_Slope])[0]

    toPredict = [[
        Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope
    ]]
    heart_model = BaseConfig.heart_model
    pred = heart_model.predict(toPredict)[0]
    print("pred is")
    print(pred)
    response_dict = {"Condition": pred}

    gender_save = "Male" if Sex == "M" else "Female"
    status_save = "Safe" if pred == 1 else "Unsafe"

    # patient_model = Patients(
    #     patient_name=PatientName, patient_age=Age, patient_phone=PhoneNum, 
    #     patient_gender=gender_save, patient_status=status_save, )
    
    # heart_model.save()
    
    return Response(response_dict, status=200)

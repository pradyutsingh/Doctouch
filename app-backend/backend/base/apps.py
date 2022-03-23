from django.apps import AppConfig
import os
import joblib
from django.conf import settings

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'
    HEART_MODEL_FILE = os.path.join(settings.MODELS, "heart_disease_model.pkl")
    heart_model = joblib.load(HEART_MODEL_FILE)
    DIABETES_MODEL_FILE = os.path.join(settings.MODELS, "diabetes_model.pkl")
    diabetes_model = joblib.load(DIABETES_MODEL_FILE)
    ENCODER_FILE = settings.ENCODERS

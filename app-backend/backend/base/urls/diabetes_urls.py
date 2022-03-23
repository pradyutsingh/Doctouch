from django.urls import path

from base.views import diabetes_views as views

urlpatterns = [
    path('predict/', views.predictDiabetesCondition, name='predict-diabetes'),
]
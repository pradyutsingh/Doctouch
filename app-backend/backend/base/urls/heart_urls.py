from django.urls import path

from base.views import heart_views as views

urlpatterns = [
    path('predict/', views.predictHeartCondition, name='predict-heart'),
    # path('predict/', views.predictHeartCondition, name='predict-heart'),
    path('listall/', views.getHeartPatients, name='get-heart-patients')

]
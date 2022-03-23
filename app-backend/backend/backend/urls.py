from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/users/', include('base.urls.user_urls')),
    path('api/heart/', include('base.urls.heart_urls')),
    path('api/diabetes/', include('base.urls.diabetes_urls')),
    path('admin/', admin.site.urls),
]
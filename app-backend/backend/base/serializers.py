from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id','isAdmin', 'username','email', 'name']

    def get_isAdmin(self,obj):
        return obj.is_staff

    def get__id(self, obj):
        return obj.id

    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
        
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','isAdmin', 'username','email', 'name', 'token']
    
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class PatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patients
        fields = '__all__'


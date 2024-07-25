from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import *

# Create your views here.
@api_view(['POST'])
def register_new_user(request):
    data = request.data
    
    user = RegisterSerializer(data=data)
    
    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'],
                username = data['email'],
                email = data['email'],
                password = make_password(data['password']),
            )
            
            return Response({'success':True, 'message':f'Welcome aboard, {user.first_name}!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'success':False, 'message':'This user already exists!'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'success':False, 'message':user.errors}, status=status.HTTP_400_BAD_REQUEST)
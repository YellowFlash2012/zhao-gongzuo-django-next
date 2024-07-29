from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = UserSerializer(request.user)
    
    # print(user.data.get('first_name'))
    
    # first_name = user.data.get("first_name")
    
    return Response({'success':True, 'message':f'Here are the profile details of {user.data.get("first_name")}!', "data":user.data}, status=status.HTTP_200_OK)
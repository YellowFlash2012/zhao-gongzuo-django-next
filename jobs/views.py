from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.
@api_view(["GET"])
def get_all_jobs(request):
    jobs = Job.objects.all()
    
    serializer = JobSerializer(jobs, many=True)
    
    return Response({"success":True, "message":"Here are all the jobs on this platform", "data":serializer.data}, status=status.HTTP_200_OK)
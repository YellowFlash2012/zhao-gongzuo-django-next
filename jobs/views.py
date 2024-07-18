from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Avg, Min, Max, Count

# Create your views here.
@api_view(["GET"])
def get_all_jobs(request):
    jobs = Job.objects.all()
    
    serializer = JobSerializer(jobs, many=True)
    
    return Response({"success":True, "count":len(serializer.data), "message":"Here are all the jobs on this platform", "data":serializer.data}, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    serializer = JobSerializer(job, many=False)
    
    return Response({"success":True, "message":"Here is the job you requested", "data":serializer.data}, status=status.HTTP_200_OK)

@api_view(["POST"])
def add_new_job(request):
    data = request.data
    
    job = Job.objects.create(**data)
    
    serializer = JobSerializer(job, many=False)
    
    return Response({"success":True, "message":"The new job was successfully posted!", "data":serializer.data}, status=status.HTTP_201_CREATED)

@api_view(["PUT"])
def update_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['jobType']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']

    job.save()
    
    serializer = JobSerializer(job, many=False)
    
    return Response({"success":True, "message":"This job was successfully updated!", "data":serializer.data}, status=status.HTTP_201_CREATED)

@api_view(["DELETE"])
def delete_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    job.delete()
    
    return Response({"success":True, "message":f"Job {job.id} was successfully deleted!"}, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def get_topic_stats(request, topic):

    args = { 'title__icontains': topic }
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({ 'message': f'No stats found for {topic}'.format(topic=topic) })

    
    stats = jobs.aggregate(
        total_jobs = Count('title'),
        avg_positions = Avg('positions'),
        avg_salary = Avg('salary'),
        min_salary = Min('salary'),
        max_salary = Max('salary')
    )

    return Response({"success":True, "message":"Here are all the jobs related to that topic", "data":stats}, status=status.HTTP_200_OK)
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import *
from .serializers import *
from django.db.models import Avg, Min, Max, Count
from .filters import JobFilter

# Create your views here.
@api_view(["GET"])
def get_all_jobs(request):
    
    filterset = JobFilter(request.GET, queryset=Job.objects.all().order_by('id'))
    
    count = filterset.qs.count()
    # jobs = Job.objects.all()
    
    # pagination config
    resPerPage = 9
    paginator = PageNumberPagination()
    paginator.page_size = resPerPage
    
    queryset = paginator.paginate_queryset(filterset.qs, request)
    
    serializer = JobSerializer(queryset, many=True)
    
    return Response({"success":True, "count":count, "message":"Here are all the jobs on this platform", "data":serializer.data, 'resPerPage':resPerPage}, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    applicants = job.jobapplication_set.all().count()
    
    serializer = JobSerializer(job, many=False)
    
    return Response({"success":True, "message":"Here is the job you requested", "data":serializer.data, "number_of_applicants":applicants}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_new_job(request):
    request.data['user'] = request.data
    
    data = request.data
    
    job = Job.objects.create(**data)
    
    serializer = JobSerializer(job, many=False)
    
    return Response({"success":True, "message":"The new job was successfully posted!", "data":serializer.data}, status=status.HTTP_201_CREATED)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    # check if job creator is the one who wants to update it
    if job.user != request.user:
        return Response({"success": False, "message":"You can NOT perform this action"}, status=status.HTTP_403_FORBIDDEN)
    
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
@permission_classes([IsAuthenticated])
def delete_one_job(request, pk):
    job = get_object_or_404(Job, id=pk)
    
    # check if job creator is the one who wants to update it
    if job.user != request.user:
        return Response({"success": False, "message":"You can NOT perform this action"}, status=status.HTTP_403_FORBIDDEN)
    
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

    return Response({"success":True, "message":"Here are all the stats related to that topic", "data":stats}, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apply_for_a_job(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)
    
    if user.user_profile.resume == "":
        return Response({"success": False, "message":"You can't apply for a job without a resume. Please upload your resume"}, status=status.HTTP_400_BAD_REQUEST)
    
    if job.lastDate < timezone.now():
        return Response({"success": False, "message":"This job has expired!"}, status=status.HTTP_400_BAD_REQUEST)
    
    already_applied = job.jobapplication_set.filter(user=user).exists()
    
    if already_applied:
        return Response({"success": False, "message":"You have already applied for this job!"}, status=status.HTTP_400_BAD_REQUEST)
    
    apply_for_job = JobApplication.objects.create(
        job = job,
        user = user,
        resume = user.user_profile_resume
    )
    
    return Response({"success":True, "applied":True, "message":"Job application successful!", "job_id":apply_for_job.id}, status=status.HTTP_201_CREATED)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_loggedin_user_job_applications(request):
    args = {'user_id':request.user.id}
    
    jobs = JobApplication.objects.filter(**args)
    
    serializer = JobApplicationSerializer(jobs, many=True)
    
    return Response({"success":True, "message":"Here are all the jobs you have applied to!", "data":serializer.data}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_job_applied_to(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)
    
    applied = job.jobapplication_set.filter(user=user).exists()
    
    return Response({"success":True, "message":"You have already applied to this job!", "data":applied}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_jobs_posted_by_logged_in_employer(request):
    args = {'user':request.user.id}
    
    jobs = Job.objects.filter(**args)
    
    serializer = JobSerializer(jobs, many=True)
    
    return Response({"success":True, "message":"Here are all your jobs!", "data":serializer.data}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_list_of_job_applicants(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)
    
    if job.user != user:
        return Response({"success": False, "message":"You can't access this resource!"}, status=status.HTTP_403_FORBIDDEN)
    
    candidates = job.jobapplication_set.all()
    
    serializer = JobApplicationSerializer(candidates, many=True)
    
    return Response({"success":True, "message":f"Here are all the candidates that applied for job {job.id}!", "data":serializer.data}, status=status.HTTP_200_OK)
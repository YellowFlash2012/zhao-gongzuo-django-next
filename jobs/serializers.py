from rest_framework import serializers
from .models import Job, JobApplication

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"

class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    class Meta:
        model = JobApplication
        fields = ("job", "user", "resume", "applied_at")
        

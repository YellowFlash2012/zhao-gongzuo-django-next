from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point

from datetime import *

from django.contrib.auth.models import User

import geocoder
import os

# Create your models here.

class JobType(models.TextChoices):
    FullTime = "Full Time"
    PartTime = "Part Time"
    Internship = "Internship"

class Education(models.TextChoices):
    Bachelors = "Bachelors"
    Masters = "Masters"
    PhD = "PhD"

class Experience(models.TextChoices):
    Entry = "Entry"
    Junior = "Junior"
    Intermediate = "Intermediate"
    Middle = "Middle"
    Senior = "Senior"
    Lead = "Lead"

class Industry(models.TextChoices):
    IT = "IT"
    B2C = "B2C"
    B2B = "B2B"
    Banking = "Banking"
    Mining = "Mining"
    Government = "Government"
    Manufacturing = "Manufacturing"
    Telecommunications = "Telco/Media"
    
def return_date_time():
    now = datetime.now()
    return now + timedelta(days=9)

class Job(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=200, null=True)
    jobType = models.CharField(max_length=20, choices=JobType.choices ,default=JobType.FullTime)
    
    education = models.CharField(max_length=20, choices=Education.choices ,default=Education.Bachelors)
    
    experience = models.CharField(max_length=40, choices=Experience.choices ,default=Experience.Junior)
    
    industry = models.CharField(max_length=40, choices=Industry.choices ,default=Industry.B2C)
    
    salary = models.IntegerField(default=9, validators=[MinValueValidator(9), MaxValueValidator(300000)])
    
    positions = models.IntegerField(default=1)
    
    company = models.CharField(max_length=100, null=True)
    
    point = gismodels.PointField(default=Point(0.0, 0.0))
    
    lastDate = models.DateTimeField(default=return_date_time)
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        g = geocoder.mapquest(self.address, key=os.environ.get("MAPQUEST_CONSUMER_SECRET"))
        
        print(g)
        
        lng = g.lng
        lat = g.lat
        
        self.point = Point(lng, lat)
        
        super(Job, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.title
    
class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200)
    applied_at = models.DateTimeField(auto_now_add=True)
from django.db import models
from django.contrib.auth.models import User

from django.dispatch import receiver
from django.db.models.signals import post_save
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, related_name="user_profile", on_delete=models.CASCADE)
    
    resume = models.FileField(null=True)
    
@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):
    user = instance
    
    if created:
        profile = Profile(user=user)
        profile.save()
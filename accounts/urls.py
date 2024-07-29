from django.urls import path
from . import views

urlpatterns = [
    path("", views.register_new_user, name="register_new_user"),
    
    path("profile", views.get_user_profile, name="get_user_profile"),
    
    path("profile/update", views.update_user_profile, name="update_user_profile"),
    
    
]

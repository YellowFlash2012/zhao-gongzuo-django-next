from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_all_jobs, name="get_all_jobs"),
    
    path("new", views.add_new_job, name="add_new_jobs"),
    
    path("<str:pk>", views.get_one_job, name="get_one_job"),
    
    path("<str:pk>/update", views.update_one_job, name="update_one_job"),
    
    path("<str:pk>/delete", views.delete_one_job, name="delete_one_job"),
    
    path("stats/<str:topic>", views.get_topic_stats, name="get_topic_stats"),
    
    path("<str:pk>/apply", views.apply_for_a_job, name="apply_for_a_job"),
    
    path("profile/jobs/applied", views.get_loggedin_user_job_applications, name="get_loggedin_user_job_applications"),
    
    path("profile/jobs", views.get_loggedin_user_jobs, name="get_loggedin_user_jobs"),
    
    path("<str:pk>/check", views.job_applied_to, name="job_applied_to"),
    
    path("<str:pk>/candidates", views.get_list_of_job_applicants, name="get_list_of_job_applicants"),
]

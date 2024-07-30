
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path("api/v1/jobs/", include("jobs.urls")),
    
    path("api/v1/users/", include("accounts.urls")),
    
    path("api/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path("api/token/verify/", TokenVerifyView.as_view(), name='token_refresh'),
]

handler404 = 'jobbee.utils.error_views.handler404'
handler500 = 'jobbee.utils.error_views.handler500'
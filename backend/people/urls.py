from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_csv, name='upload_csv'),  # CSV upload endpoint
    path('list/', views.list_people, name='list_people'),  # List people endpoint
]

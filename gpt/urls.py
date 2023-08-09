from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/openai', views.openai_chat, name='openai_chat'),
]
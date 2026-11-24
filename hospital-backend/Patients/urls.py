"""
URL configuration for Hospital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'patients',views.PatientViewSet,basename='patient')

urlpatterns = [
   
    path('index/',views.index,name='index'),
    path('login/',views.userlogin,name='login'),
    path('dashboard/',views.dashboard,name='dashboard'),
    path('book_appointment/',views.book_appointment,name='book_appointment'),
    path('profile/',views.profile,name='profile'),
    path('add_patient/',views.add_patient,name="add_patient"),
    path('patients/add/', views.patient_create, name='patient_create'),
    path('patients/<int:pk>/edit/', views.patient_update, name='patient_update'),
    path('patients/<int:pk>/delete/', views.patient_delete, name='patient_delete'),
    path('make_payment/',views.make_payment,name='make_payment'),
    path('', include(router.urls)),
   
  
]


from django.shortcuts import redirect, render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

from Patients.forms import PatientForm
from .models import Patient
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import PatientSerializer
from django.contrib import messages
from django_daraja.mpesa.core import MpesaClient


# Create your views here.
def index(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect ('dashboard')
        else:
            form = UserCreationForm()
            return render(request,'index.html', {'form': form})
    else:
        form = UserCreationForm()
    return render(request,'index.html', {'form': form})

def userlogin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            error_message = 'Invalid username or password'
            return render(request, 'login.html', {'error_message': error_message})
    return render(request,'login.html')

def dashboard(request):
    patients = Patient.objects.all()
    return render(request,'dashboard.html',{'patients': patients})

def book_appointment(request):
    return render(request,'bookappointment.html')

def profile(request):
    return render(request,'profile.html')

def add_patient(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
    else:
        form = PatientForm()
    return render(request, 'add_patient.html', {'form': form})

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

def make_payment(request):
    if request.method == 'POST':
        patient_name =request.POST.get('patient_name')
        phone_number = request.POST.get('phone_number')
        amount = float(request.POST.get('amount'))
        payment = Payment.objects.create(
            patient_name= patient_name,
            phone_number = phone_number,
            amount = amount,
        )
        cl =MpesaClient()
        account_reference = "Hospital Payment"
        transaction_desc ="Payment for hospital services"
        callback_url = "https://darajambili.herokuapp.com/express-payment"
        response = cl.stk_push(phone_number,amount,account_reference,transaction_desc,callback_url)
        payment.transaction_id = response['CheckoutRequestID']
        payment.save()
        messsages.success(request,'Payment initiated successfully. Please complete the payment on your phone')
        return redirect('dashboard')
    return render(request,'make_payment.html')
  
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Patient
from .forms import PatientForm

@login_required
def dashboard(request):                       # READ
    patients = Patient.objects.all()
    return render(request, 'dashboard.html', {'patients': patients})

@login_required
def patient_create(request):                  # CREATE
    form = PatientForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('dashboard')
    return render(request, 'patient_form.html', {'form': form, 'title': 'Add Patient'})

@login_required
def patient_update(request, pk):              # UPDATE
    patient = get_object_or_404(Patient, pk=pk)
    form = PatientForm(request.POST or None, instance=patient)
    if form.is_valid():
        form.save()
        return redirect('dashboard')
    return render(request, 'patient_form.html', {'form': form, 'title': 'Edit Patient'})

@login_required
def patient_delete(request, pk):              # DELETE
    patient = get_object_or_404(Patient, pk=pk)
    if request.method == 'POST':
        patient.delete()
    return redirect('dashboard')

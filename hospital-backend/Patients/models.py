from django.db import models

class Patient(models.Model):
    patient_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.patient_id} - {self.name}"


class Payment(models.Model):
    patient_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits = 10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add= True)
    transaction_id = models.CharField(max_length= 100,unique=True)

    def str (self):
        return f"Payment {self.transaction_id} for {self.patient_name}"

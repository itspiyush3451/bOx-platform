from django.db import models

# Create your models here.

# Book Model
class Book(models.Model):
    title = models.CharField(max_length=255)  # Name of the book
    description = models.TextField()  # Detailed info about the book
    price = models.DecimalField(max_digits=6, decimal_places=2)  # Price of the book
    image = models.ImageField(upload_to="book_images/", blank=True, null=True)  # Book cover image
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when book is added

    def __str__(self):
        return self.title  # Returns book title when printed
    


# Notes Model

class Note(models.Model):
    title = models.CharField(max_length=255)  # Name of the notes
    subject = models.CharField(max_length=100)  # Subject of the notes
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)  # Price (optional, free or paid)
    file = models.FileField(upload_to="note_files/")  # PDF or image of the notes
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp

    def __str__(self):
        return self.title
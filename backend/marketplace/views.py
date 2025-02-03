from django.shortcuts import render
from rest_framework import generics
from .models import Book, Note
from .serializers import BookSerializer, NoteSerializer
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to the bOx API!"})

# API View to List and Create Books
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

# API View to List and Create Notes
class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

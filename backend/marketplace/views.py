from django.shortcuts import render
from rest_framework import generics
from .models import Book, Note
from .serializers import BookSerializer, NoteSerializer
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics

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
    parser_classes = (MultiPartParser, FormParser)  # Ensure this is active

    def post(self, request, *args, **kwargs):
        print("Received Data:", request.data)  # Debugging log
        print("Received Files:", request.FILES)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Errors:", serializer.errors)  # Print validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
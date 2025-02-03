from rest_framework import serializers
from .models import Book, Note

# Serializer for Book
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'  # Serialize all fields

# Serializer for Note
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'  # Serialize all fields

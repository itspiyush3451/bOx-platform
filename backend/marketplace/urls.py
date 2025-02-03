from django.urls import path
from .views import  BookListCreateView, NoteListCreateView

urlpatterns = [
  
    path("books/", BookListCreateView.as_view(), name="book-list-create"),
    path("notes/", NoteListCreateView.as_view(), name="note-list-create"),
]

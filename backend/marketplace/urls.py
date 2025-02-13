from django.urls import path
from .views import (
    BookListCreateView, BookDetailView, 
    NoteListCreateView, NoteDetailView
)

urlpatterns = [
    path("books/", BookListCreateView.as_view(), name="book-list-create"),
    path("books/<int:pk>/", BookDetailView.as_view(), name="book-detail"),  # ✅ Supports GET, PUT, PATCH, DELETE

    path("notes/", NoteListCreateView.as_view(), name="note-list-create"),
    path("notes/<int:pk>/", NoteDetailView.as_view(), name="note-detail"),  # ✅ Supports GET, PUT, PATCH, DELETE
]

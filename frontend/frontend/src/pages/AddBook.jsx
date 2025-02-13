import { useState, useEffect } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/`
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to fetch books.");
    }
    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setImage(null);
    setImagePreview(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !price.trim()) {
      alert("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/books/${editId}/`,
          formData
        );
        alert("Book updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/books/`, formData);
        alert("Book added successfully!");
      }
      resetForm();
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book.");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}/`);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setDescription(book.description);
    setPrice(book.price);
    setEditId(book.id);
  };

  return (
    <div>
      <h2>{editId ? "Edit Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && (
          <div>
            <p>Image Preview:</p>
            <img src={imagePreview} alt="Book Cover" width={100} />
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editId ? "Update Book" : "Add Book"}
        </button>
        {editId && <button onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h3>Existing Books</h3>
      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> - {book.description} - ${book.price}
              {book.image && (
                <img src={book.image} alt="Book Cover" width={50} />
              )}
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddBook;

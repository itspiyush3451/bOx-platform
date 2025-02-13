import { useState, useEffect } from "react";
import axios from "axios";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notes/`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Failed to fetch notes.");
    }
    setIsLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setPrice("");
    setFile(null);
    setFilePreview(null);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !price.trim()) {
      alert("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("price", price);
    if (file) formData.append("file", file);

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/notes/${editId}/`,
          formData
        );
        alert("Note updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/notes/`, formData);
        alert("Note added successfully!");
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note.");
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}/`);
      alert("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setSubject(note.subject);
    setPrice(note.price);
    setEditId(note.id);
  };

  return (
    <div>
      <h2>{editId ? "Edit Note" : "Add a New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.docx,.jpg,.png"
          onChange={handleFileChange}
        />
        {filePreview && (
          <div>
            <p>File Preview:</p>
            {file?.type.startsWith("image/") ? (
              <img src={filePreview} alt="Preview" width={100} />
            ) : (
              <p>{file.name}</p>
            )}
          </div>
        )}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editId ? "Update Note" : "Add Note"}
        </button>
        {editId && <button onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h3>Existing Notes</h3>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong> - {note.subject} - ${note.price}
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddNotes;

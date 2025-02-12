import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch Books
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/`)
      .then((response) => {
        console.log("Books API Response:", response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });

    // Fetch Notes
    axios
      .get(`${import.meta.env.VITE_API_URL}/notes/`)
      .then((response) => {
        console.log("Notes API Response:", response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  return (
    <div>
      <h1>Marketplace</h1>

      {/* Books Section */}
      <h2>Books for Sale</h2>
      {Array.isArray(books) && books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> - ₹{book.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available</p>
      )}

      {/* Notes Section */}
      <h2>Notes Available</h2>
      {Array.isArray(notes) && notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong> - {note.description}
              {note.file && (
                <a
                  href={`${import.meta.env.VITE_API_URL}${note.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View File
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default Home;

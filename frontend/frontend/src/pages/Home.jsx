import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/`) //fetching books from backend
      .then((response) => {
        console.log("API Response in Frontend:", response.data); // Debugging line
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div>
      <h1>Books for Sale</h1>
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
    </div>
  );
};

export default Home;

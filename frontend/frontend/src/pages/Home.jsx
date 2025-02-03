import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/`) // Fetch books from backend
      .then((response) => {
        console.log("API Response:", response.data); // Check the response format
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div>
      <h1>Books for Sale</h1>
      <ul>
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> - ₹{book.price}
            </li>
          ))
        ) : (
          <p>No books available</p>
        )}
      </ul>
    </div>
  );
};

export default Home;

import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/`,
        {
          title,
          description,
          price,
        }
      );

      console.log("Book added:", response.data);
      alert("Book added successfully!");

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setPrice("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
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
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

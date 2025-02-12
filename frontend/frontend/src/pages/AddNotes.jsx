import { useState } from "react";
import axios from "axios";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(""); // Updated field name
  const [price, setPrice] = useState(""); // Updated field name
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Select first uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !subject.trim() || !price.trim() || !file) {
      alert("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject); // Ensure correct field name
    formData.append("price", price); // Ensure correct field name
    formData.append("file", file);

    console.log("FormData Sent:", [...formData.entries()]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/`,
        formData
      );

      console.log("Note added successfully:", response.data);
      alert("Note added successfully!");

      setTitle("");
      setSubject("");
      setPrice("");
      setFile(null);
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data || error.message
      );
      alert(
        `Failed to add note: ${
          error.response?.data?.error || "Unknown error occurred"
        }`
      );
    }
  };

  return (
    <div>
      <h2>Add a New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note Title"
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
          required
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNotes;

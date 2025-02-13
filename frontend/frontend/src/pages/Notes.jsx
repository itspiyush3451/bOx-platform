import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notes/`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div>
      <h2>Notes List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title} - {note.subject} - ${note.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;

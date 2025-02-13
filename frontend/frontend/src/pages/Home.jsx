import Navbar from "./Navbar"; // Import the Navbar component
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Include Navbar */}
      <Navbar />

      {/* Homepage Content */}
      <div style={styles.container}>
        <h1>Welcome to Notes & Books App 📚</h1>
        <p>Manage your books and notes easily with this app.</p>
        <div style={styles.buttons}>
          <Link to="/books" style={styles.button}>
            View Books
          </Link>
          <Link to="/notes" style={styles.button}>
            View Notes
          </Link>
          <Link to="/add-note" style={styles.button}>
            Add a Note
          </Link>
          <Link to="/add-book" style={styles.button}>
            Add a Book
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles for better UI
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttons: {
    marginTop: "20px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Home;

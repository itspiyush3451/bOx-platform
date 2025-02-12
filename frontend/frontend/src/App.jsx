import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook"; // Import new page
import AddNotes from "./pages/AddNotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} /> {/* Add new route */}
        <Route path="/add-note" element={<AddNotes />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;

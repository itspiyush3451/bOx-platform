import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/add-note">Add Notes</Link>
        </li>
        <li>
          <Link to="/add-book">Add books</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

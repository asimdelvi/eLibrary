import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { Books } from "./pages/books/Books";
import { NewBook } from "./pages/books/NewBook";
import { Book } from "./pages/books/Book";
import { UpdateBook } from "./pages/books/UpdateBook";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <br />
        <NavLink to="/books">Books</NavLink>
        <br />
        <NavLink to="/books/new">New Book</NavLink>
        <br />
        <NavLink to="/Register">Register</NavLink>
        <br />
        <NavLink to="/Login">Login</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/new" element={<NewBook />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/:id/update" element={<UpdateBook />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

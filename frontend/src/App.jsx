import React from "react";
// import "./App.css";
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
      <nav className="px-20 flex justify-between nav-background sticky top-0 py-4 border-0 rounded-none">
        <h1>eLibrary</h1>
        <div>
          <NavLink className="px-4" to="/">
            Home
          </NavLink>
          <NavLink className="px-4" to="/books">
            Books
          </NavLink>
          <NavLink className="px-4" to="/books/new">
            New Book
          </NavLink>
        </div>
        <div>
          <NavLink className="" to="/Register">
            Register
          </NavLink>
          <NavLink className="pl-4" to="/Login">
            Login
          </NavLink>
        </div>
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

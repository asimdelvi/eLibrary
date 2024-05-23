import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// * Pages and components
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { Books } from "./pages/books/Books";
import { NewBook } from "./pages/books/NewBook";
import { Book } from "./pages/books/Book";
import { Home } from "./pages/books/Home";
import { UpdateBook } from "./pages/books/UpdateBook";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/all" element={<Books />} />
        <Route path="/books/new" element={<NewBook />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/:id/update" element={<UpdateBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;

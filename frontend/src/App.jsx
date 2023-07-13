import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { Books } from "./pages/books/Books";
import { NewBook } from "./pages/books/NewBook";
import { Book } from "./pages/books/Book";
import { Home } from "./pages/books/Home";
import { UpdateBook } from "./pages/books/UpdateBook";
import { NavBar } from "./components/NavBar";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => toast("Wow so easy !");

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/all" element={<Books />} />
        <Route path="/books/new" element={<NewBook />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/:id/update" element={<UpdateBook />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;

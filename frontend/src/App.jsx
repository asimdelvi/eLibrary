import React from "react";
// import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { Books } from "./pages/books/Books";
import { NewBook } from "./pages/books/NewBook";
import { Book } from "./pages/books/Book";
import { UpdateBook } from "./pages/books/UpdateBook";

import { TbBooks } from "react-icons/tb";
import { BiBookAdd, BiHomeAlt2 } from "react-icons/bi";

function App() {
  return (
    <>
      <nav className="px-20 flex items-center justify-between nav-background sticky top-0 py-4 border-0 rounded-none">
        <h1>eLibrary</h1>
        <div className="flex items-center">
          <NavLink className="px-4" to="/">
            <div className="rounded-full border-black border-r-[1px] border-t-[1px] border-b-[1px] rounded-l-0">
              <BiHomeAlt2 className="rounded-full bg-black p-[6px] box-content" />
              <span className="pr-3 pl-2">Home</span>
            </div>
          </NavLink>
          <NavLink className="px-4" to="/books">
            <TbBooks className="rounded-full bg-black p-[6px] box-content" />
          </NavLink>
          <NavLink className="px-4" to="/books/new">
            <BiBookAdd className="rounded-full bg-black p-[6px] box-content" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/Login">
            <span className="rounded-xl bg-black border-black border-2 text-white px-2 py-1">
              Login
            </span>
          </NavLink>
          <NavLink to="/Register">
            <span className="ml-4 rounded-xl border-black border-2 px-2 py-1">
              Register
            </span>
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

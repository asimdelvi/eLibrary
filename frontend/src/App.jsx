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
      <nav className="transition duration-700 ease-in px-20 flex items-center justify-between nav-background sticky top-0 py-4 border-0 rounded-none">
        <h1 className="text-lg font-mono font-extrabold">eLibrary</h1>
        <div className="flex items-center">
          <NavLink className="px-4 group" to="/">
            <div className="rounded-full flex">
              <BiHomeAlt2 className="rounded-full bg-black p-[6px] box-content" />
              <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
                Home
              </span>
            </div>
          </NavLink>
          <NavLink className="px-4 group" to="/books">
            <div className="rounded-full flex">
              <TbBooks className="rounded-full bg-black p-[6px] box-content" />
              <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
                Books
              </span>
            </div>
          </NavLink>
          <NavLink className="mx-4 group" to="/books/new">
            <div className="rounded-full flex">
              <BiBookAdd className="rounded-full bg-black p-[6px] box-content" />
              <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
                New Book
              </span>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to="/Login">
            <span className="rounded-xl bg-black border-black border-2 text-white px-3 py-[6px] text-sm">
              Login
            </span>
          </NavLink>
          <NavLink to="/Register">
            <span className="ml-4 rounded-xl border-black border-2 px-3 py-[6px] text-sm">
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

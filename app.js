import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/books.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import ejsMate from "ejs-mate";
import methodOverride from "method-override";

// ES6 does not support __dirname, so...
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName
const __dirname = dirname(__filename);

mongoose.connect("mongodb://localhost:27017/eLibraryDB");
const app = express();

// TODO: what is app.engine()
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// * Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

// * Index | /books | GET | Display all books
app.get("/books", async (req, res) => {
  const allBooks = await Book.find({});
  res.render("books/index", { allBooks });
});

// * New | /books/new | GET | Form to create new book
app.get("/books/new", async (req, res) => {
  res.render("books/new");
});

// * Create | /books | POST | Create new book on server
app.post("/books", async (req, res) => {
  const { book } = req.body;
  await Book.create(book);
  res.redirect("/books");
});

// * Show | /books/:id | GET | Details of one specific book
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render("books/show", { book });
});

// * Update | /books/:id | PATCH | Update a specific book on server
app.patch("/books/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body.book, {
    runValidators: true,
  });
  res.redirect("/books");
});

// * Edit | /books/:id/edit | GET | Form to edit specific book
app.get("/books/:id/edit", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render("books/edit", { book });
});

// * Destroy | /books/:id | DELETE | Deletes specific item on server
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndRemove(req.params.id);
  res.redirect("/books");
});

app.listen(3090, () => {
  console.log("Listening on port 3090");
});

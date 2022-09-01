import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/books.js";

mongoose
  .connect(
    "mongodb+srv://asimdelvi:YGJFUU0K94abRIk6@cluster0.m5ywbzk.mongodb.net/Library?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connected"));

const app = express();

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Index | /api/books | GET | Display all books
app.get("/api/books", async (req, res) => {
  const allBooks = await Book.find({});
  res.status(200).json(allBooks);
});

// * Create | /api/books | POST | Create new book on server
app.post("/api/books", async (req, res) => {
  const book = await Book.create(req.body);
  res.status(200).json(book);
});

// * Show | /api/books/:id | GET | Details of one specific book
app.get("/api/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
});

// * Update | /api/books/:id | PATCH | Update a specific book on server
app.patch("/api/books/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
});

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
app.delete("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  res.status(200).json(book);
});

app.listen(3090, () => {
  console.log("Listening on port 3090");
});

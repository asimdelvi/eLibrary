import * as dotenv from "dotenv";
if (process.env.NODE_ENV != "Production") {
  // in development, dotenv will configure process.env values
  // but in production, process.env values will be added by the server.
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { Book } from "./models/books.js";
import fs from "fs";

mongoose.connect(process.env.DB_URL).then(() => console.log("DB connected"));

const app = express();

// ES6 does not support __dirname
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName
const __dirname = dirname(__filename);

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// * Index | /api/books | GET | Display all books
app.get("/api/books", async (req, res) => {
  const allBooks = await Book.find({});
  res.status(200).json(allBooks);
});

// * Create | /api/books | POST | Create new book on server
app.post("/api/books", async (req, res) => {
  const path = __dirname + `/uploads/${uuidv4()}/`;

  const { book, image } = req.files;
  const { title } = req.body;
  const pdfURL = path + book.name;
  const imageURL = path + image.name;

  // TODO: does this creates upload folder too, if its not exist.
  fs.mkdirSync(path);
  book.mv(pdfURL);
  book.mv(imageURL);
  const createdBook = await Book.create({ title, pdfURL, imageURL });
  res.status(200).json(createdBook);
});

// * Show | /api/books/:id | GET | Details of one specific book
app.get("/api/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
});

// * Update | /api/books/:id | PATCH | Update a specific book on server
app.patch("/api/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  const bookUrl = dirname(book.pdfURL);
  res.status(200).json(bookUrl);
});

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
app.delete("/api/books/:id", async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  res.status(200).json(book);
});

app.listen(3090, () => {
  console.log("Listening on port 3090");
});

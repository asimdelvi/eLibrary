import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/books.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// ES6 does not support __dirname
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName
const __dirname = dirname(__filename);

mongoose.connect("mongodb://localhost:27017/eLibraryDB");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
console.log(path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  const allBooks = await Book.find({});
  res.render("books/index", { allBooks });
});

app.listen(3090, () => {
  console.log("Listening on port 3090");
});

import { fileURLToPath } from "url";
import { dirname } from "path";
import shortid from "shortid";
import { Book } from "../models/books.js";
import fs from "fs";
import AppError from "../middleware/errorMiddleware.js";
import path from "path";

// ES6 does not support __dirname
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName and one directory up.
const __dirname = path.join(__filename, "../../");

// * Index | /api/books | GET | Display all books
export const index = async (req, res) => {
  const allBooks = await Book.find({}).populate("createdBy", "username");
  console.log(__filename);
  res.status(200).json(allBooks);
};

// * Create | /api/books | POST | Create new book on server
export const createBook = async (req, res) => {
  const { book } = req.files;
  const { title } = req.body;

  const bookID = shortid.generate();

  const path = __dirname + `uploads/`;
  const bookName = bookID + book.name;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  book.mv(path + bookName);

  const createdBook = await Book.create({
    title,
    pdfURL: bookName,
    createdBy: req.user.id,
  });

  res.status(200).json(createdBook);
};

// * Show | /api/books/:id | GET | Details of one specific book
export const showBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "createdBy",
    "username"
  );
  res.status(200).json(book);
};

// * Update | /api/books/:id | PATCH | Update a specific book on server
// TODO: optimize the code and document it.
// TODO: calling findById so many times
export const updateBook = async (req, res) => {
  const bookID = shortid.generate();

  const path = __dirname + `uploads/`;
  const bookName = bookID + book.name;

  let book = await Book.findById(req.params.id);

  if (!book) throw new AppError("Book not found", 400);

  let { pdfURL } = book;
  const filesToUpdate = req.files;
  const { title } = req.body;
  if (filesToUpdate && filesToUpdate.book) {
    const book = filesToUpdate.book;
    book.mv(dirname(pdfURL) + "/" + book.name);
    fs.unlinkSync(pdfURL);
    pdfURL = dirname(pdfURL) + "/" + book.name;
  }

  await Book.findByIdAndUpdate(req.params.id, {
    pdfURL,
    title,
  });
  const updatedBook = await Book.findById(req.params.id);

  res.status(200).json(updatedBook);
};

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new AppError("Book not found", 400);
  const { pdfURL } = book;
  fs.rmSync(dirname(pdfURL), { recursive: true, force: true });
  await Book.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
};

// * Download | /api/books/:path | GEt | Download the file form the file sytem

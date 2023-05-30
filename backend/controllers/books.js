import { fileURLToPath } from "url";
import shortid from "shortid";
import { Book } from "../models/books.js";
import fs, { read } from "fs";
import AppError from "../middleware/errorMiddleware.js";
import path from "path";

// ES6 does not support __dirname
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName and one directory up.
const __dirname = path.join(__filename, "../../");
const uploadPath = __dirname + `uploads/`;

// * Index | /api/books | GET | Display all books
export const index = async (req, res) => {
  const allBooks = await Book.find({}).populate("createdBy", "username");
  res.status(200).json(allBooks);
};

// * Create | /api/books | POST | Create new book on server
export const createBook = async (req, res) => {
  const { book } = req.files;
  const { title } = req.body;

  const bookName = shortid.generate() + book.name;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  book.mv(uploadPath + bookName);

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
  let book = await Book.findById(req.params.id).populate(
    "createdBy",
    "username"
  );

  if (!book) throw new AppError("Book not found", 400);

  if (req.body.title) book.title = req.body.title;
  if (req.files && req.files.book) {
    const newBook = req.files.book;
    const bookName = shortid.generate() + newBook.name;
    newBook.mv(uploadPath + bookName);
    fs.rmSync(uploadPath + book.pdfURL);
    book.pdfURL = bookName;
  }
  await book.save();

  res.status(200).json(book);
};

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new AppError("Book not found", 400);

  fs.rmSync(uploadPath + book.pdfURL, { recursive: true, force: true });
  await Book.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
};

// * Download | /api/books/:path | GET | Download the file form the file sytem
export const downloadBook = (req, res) => {
  const bookName = req.params.filename;
  const bookPath = uploadPath + bookName;
  if (!fs.existsSync(bookPath))
    throw new AppError("No such file or directory", 404);
  res.download(bookPath);
  // res.status(200).json({ file: bookName });
};

export const viewBook = (req, res) => {
  const bookName = req.params.filename;
  const bookPath = uploadPath + bookName;
  fs.readFile(bookPath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
};
// app.post("/asset", function (request, response) {
//   var tempFile = "/home/applmgr/Desktop/123456.pdf";
//   fs.readFile(tempFile, function (err, data) {
//     response.contentType("application/pdf");
//     response.send(data);
//   });
// });

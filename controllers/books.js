import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { Book } from "../models/books.js";
import fs from "fs";

// ES6 does not support __dirname
// Converts present file URL to path
const __filename = fileURLToPath(import.meta.url);
// selects directories, removes the fileName
const __dirname = dirname(__filename);

// * Index | /api/books | GET | Display all books
export const index = async (req, res) => {
  const allBooks = await Book.find({});
  res.status(200).json(allBooks);
};

// * Create | /api/books | POST | Create new book on server
export const createBook = async (req, res) => {
  // TODO: Can we use mongoose instead (pre)
  const path = __dirname + `/../uploads/${uuidv4()}/`;

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
};

// * Show | /api/books/:id | GET | Details of one specific book
export const showBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(200).json(book);
};

// * Update | /api/books/:id | PATCH | Update a specific book on server
// TODO: optimize the code and document it.
// TODO: calling findById so many times
export const updateBook = async (req, res) => {
  let { pdfURL, imageURL } = await Book.findById(req.params.id);
  const filesToUpdate = req.files;
  const { title } = req.body;
  if (filesToUpdate) {
    if (filesToUpdate.book) {
      const book = filesToUpdate.book;
      book.mv(dirname(pdfURL) + "/" + book.name);
      fs.unlinkSync(pdfURL);
      pdfURL = dirname(pdfURL) + "/" + book.name;
    }
    if (filesToUpdate.image) {
      const image = filesToUpdate.image;
      image.mv(dirname(imageURL) + "/" + image.name);
      fs.unlinkSync(imageURL);
      imageURL = dirname(imageURL) + "/" + image.name;
    }
  }

  await Book.findByIdAndUpdate(req.params.id, {
    pdfURL,
    imageURL,
    title,
  });
  const updatedBook = await Book.findById(req.params.id);

  res.status(200).json(updatedBook);
};

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
export const deleteBook = async (req, res) => {
  const { pdfURL } = await Book.findByIdAndDelete(req.params.id);
  fs.rmSync(dirname(pdfURL), { recursive: true, force: true });
  await Book.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
};

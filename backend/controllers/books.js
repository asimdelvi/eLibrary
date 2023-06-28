import { Book } from "../models/books.js";
import AppError from "../middleware/errorMiddleware.js";
import { cloudinary } from "../cloudinary/index.js";

// * Index | /api/books | GET | Display all books
export const index = async (req, res) => {
  const allBooks = await Book.find({}).populate("createdBy", "username");
  res.status(200).json(allBooks);
};

// * Create | /api/books | POST | Create new book on server
export const createBook = async (req, res) => {
  const { title, description } = req.body;
  const { filename, path } = req.file;
  const createdBook = await Book.create({
    title,
    description,
    pdfURL: path,
    publicID: filename,
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
export const updateBook = async (req, res) => {
  let book = await Book.findById(req.params.id).populate(
    "createdBy",
    "username"
  );

  if (!book) throw new AppError("Book not found", 400);

  if (req.body.title) book.title = req.body.title;
  if (req.body.description) book.description = req.body.description;

  if (req.file && req.file.fieldname === "book") {
    const { filename, path } = req.file;

    await cloudinary.uploader.destroy(book.publicID);
    book.pdfURL = path;
    book.publicID = filename;
    console.log(req.file);
  }
  await book.save();

  res.status(200).json(book);
};

// * Destroy | /api/books/:id | DELETE | Deletes specific item on server
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new AppError("Book not found", 400);

  await cloudinary.uploader.destroy(book.publicID);
  await Book.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
};

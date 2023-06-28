import {
  index,
  createBook,
  showBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import { catchAsync } from "../middleware/errorMiddleware.js";
import { isLoggedIn, isAuthor } from "../middleware/authMiddleware.js";
import { validateBook } from "../middleware/validationMiddleware.js";
import { bookSchema } from "../middleware/schemas.js";
import express from "express";
import { storage } from "../cloudinary/index.js";
import multer from "multer";

const upload = multer({ storage });

export const router = express.Router();

router
  .route("/")
  .get(index)
  .post(
    catchAsync(isLoggedIn),
    upload.single("book"),
    validateBook(bookSchema.create),
    catchAsync(createBook)
  );

router
  .route("/:id")
  .get(catchAsync(showBook))
  .patch(
    catchAsync(isLoggedIn),
    catchAsync(isAuthor),
    //it is important to add this below line, otherwise req.body will show empty even
    //if we don't add file selection option.
    upload.single("book"),
    validateBook(bookSchema.update),
    catchAsync(updateBook)
  )
  .delete(catchAsync(isLoggedIn), catchAsync(isAuthor), catchAsync(deleteBook));

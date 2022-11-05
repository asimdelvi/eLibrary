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

export const router = express.Router();

router
  .route("/")
  .get(index)
  .post(
    catchAsync(isLoggedIn),
    validateBook(bookSchema),
    catchAsync(createBook)
  );

router
  .route("/:id")
  .get(catchAsync(showBook))
  .patch(
    catchAsync(isLoggedIn),
    catchAsync(isAuthor),
    validateBook(bookSchema),
    catchAsync(updateBook)
  )
  .delete(catchAsync(isLoggedIn), catchAsync(isAuthor), catchAsync(deleteBook));

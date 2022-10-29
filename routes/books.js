import {
  index,
  createBook,
  showBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import { catchAsync } from "../middleware/errorMiddleware.js";
import { isLoggedIn, isAuthor } from "../middleware/authMiddleware.js";
import express from "express";

export const router = express.Router();

router
  .route("/")
  .get(index)
  .post(catchAsync(isLoggedIn), catchAsync(createBook));

router
  .route("/:id")
  .get(catchAsync(showBook))
  .patch(catchAsync(isLoggedIn), catchAsync(isAuthor), catchAsync(updateBook))
  .delete(catchAsync(isLoggedIn), catchAsync(isAuthor), catchAsync(deleteBook));

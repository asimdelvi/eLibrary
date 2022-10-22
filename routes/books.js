import {
  index,
  createBook,
  showBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import { isLoggedIn, isAuthor } from "../middleware/authMiddleware.js";
import express from "express";

export const router = express.Router();

router.route("/").get(index).post(isLoggedIn, createBook);

router
  .route("/:id")
  .get(showBook)
  .patch(isLoggedIn, isAuthor, updateBook)
  .delete(isLoggedIn, isAuthor, deleteBook);

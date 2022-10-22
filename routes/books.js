import {
  index,
  createBook,
  showBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

export const router = express.Router();

router.route("/").get(index).post(protect, createBook);

router
  .route("/:id")
  .get(showBook)
  .patch(protect, updateBook)
  .delete(protect, deleteBook);

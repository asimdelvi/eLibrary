import {
  index,
  createBook,
  showBook,
  updateBook,
  deleteBook,
} from "../controllers/books.js";
import express from "express";

export const router = express.Router();

router.route("/").get(index).post(createBook);

router.route("/:id").get(showBook).patch(updateBook).delete(deleteBook);

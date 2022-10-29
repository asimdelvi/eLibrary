import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import { Book } from "../models/books.js";
import AppError from "./errorMiddleware.js";

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      throw new AppError("Not authorized", 401);
    }
  } else {
    throw new AppError("Not authorized, no token", 401);
  }
};

export const isAuthor = async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (book && !book.createdBy.equals(req.user.id)) {
    throw new AppError("Not authorized, No permission to edit this book", 401);
  }
  next();
};

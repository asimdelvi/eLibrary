import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
import { Book } from "../models/books.js";

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export const isAuthor = async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book.createdBy.equals(req.user.id)) {
    res.status(401);
    throw new Error("Not authorized, No permission to edit this book");
  }
  next();
};

import { bookSchema, userSchema } from "./schemas.js";
import AppError from "./errorMiddleware.js";

export const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  const message = error.details.map((data) => data.message).join(",");
  if (error) throw new AppError(message, 400);
  next();
};

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  const message = error.details.map((data) => data.message).join(",");
  if (error) throw new AppError(message, 400);
  next();
};

// Validate user on login and register separately
// Validation on update
// Validation on files

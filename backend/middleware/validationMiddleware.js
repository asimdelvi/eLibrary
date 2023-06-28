import AppError from "./errorMiddleware.js";

export const validateBook = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({ body: req.body, file: req.file });
    if (error) {
      const message = error.details.map((data) => data.message).join(",");
      throw new AppError(message, 400);
    }
    next();
  };
};

// function which accepts the schema  and return a middleware
export const validateUser = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map((data) => data.message).join(",");
      throw new AppError(message, 400);
    }
    next();
  };
};

// Validation on update
// Validation on files

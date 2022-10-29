export default class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV == "Production" ? null : err.stack,
  });
};

// ! Din't understood at all, but its a very standard way to handle async errors
export const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

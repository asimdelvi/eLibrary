import * as dotenv from "dotenv";
if (process.env.NODE_ENV != "Production") {
  // in development, dotenv will configure process.env values
  // but in production, process.env values will be added by the server.
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { router as booksRouter } from "./routes/books.js";
import { router as userRouter } from "./routes/users.js";

mongoose.connect(process.env.DB_URL).then(() => console.log("DB connected"));

const app = express();

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// * Routes
app.use("/api/books/", booksRouter);
app.use("/api/users/", userRouter);

// TODO: custom error handler, cors, body-parser.

app.listen(3090, () => {
  console.log("Listening on port 3090");
});

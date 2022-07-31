import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: String,
  pdfURL: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model("Book", bookSchema);

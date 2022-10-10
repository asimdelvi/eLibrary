import mongoose from "mongoose";
const Schema = mongoose.Schema;

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

bookSchema.pre("save", function () {
  console.log(this);
});
export const Book = mongoose.model("Book", bookSchema);

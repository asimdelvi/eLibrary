import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "please add a username"],
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please add a password"],
  },
});

export const User = mongoose.model("User", userSchema);

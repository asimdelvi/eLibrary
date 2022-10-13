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
  },
  password: {
    type: String,
    required: [true, "please add a password"],
  },
});

// hash password before saving to the database
// userSchema.pre("save", function (next) {
//   console.log(this, "hi");
//   next();
// });

export const User = mongoose.model("User", userSchema);

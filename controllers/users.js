import { User } from "../models/users.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });

  // TODO: add validation (password type, username type and all), async error handler
  // ! is it possible by validator to validate uniqueness
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // pre
  // here <--
  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = await User.create({ username, email, password: hashedPassword });

  res.status(200).json(user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparedPassword = bcrypt.compareSync(password, user.password);

  if (user && comparedPassword) {
    res.status(200).json({ user, password });
  }
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ status: "logout" });
};

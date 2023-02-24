import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../middleware/errorMiddleware.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  const userExist = await User.findOne({ username });

  // TODO: add validation (password type, username type and all)
  // ! is it possible by validator to validate uniqueness
  if (emailExist) {
    throw new AppError("You have already been registered", 400);
  }

  if (userExist) {
    throw new AppError("Username already exist", 400);
  }

  // pre
  // here <--
  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = await User.create({ username, email, password: hashedPassword });

  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    token: generateToken(user.id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!(user && bcrypt.compareSync(password, user.password))) {
    throw new AppError("Incorrect email or password");
  }
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    token: generateToken(user.id),
  });
};

// No need of logout in backend,
// we just have to remove the auth header.
// export const logoutUser = async (req, res) => {
//   res.status(200).json({ status: "logout" });
// };

export const getUser = (req, res) => {
  res.status(200).json({ token: req.headers });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

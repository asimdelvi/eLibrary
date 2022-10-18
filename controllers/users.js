import { User } from "../models/users.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  res.status(200).json({ status: "register" });
};

export const loginUser = async (req, res) => {
  res.status(200).json({ status: "login" });
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ status: "logout" });
};

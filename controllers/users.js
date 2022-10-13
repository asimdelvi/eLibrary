import User from "../models/users.js";

export const registerUser = async (req, res) => {
  res.status(200).json({ status: "register" });
};

export const loginUser = async (req, res) => {
  res.status(200).json({ status: "done" });
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ status: "done" });
};

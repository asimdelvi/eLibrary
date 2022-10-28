import { registerUser, loginUser, getUser } from "../controllers/users.js";
import express from "express";

export const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getme", getUser);
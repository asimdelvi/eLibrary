import { registerUser, loginUser, getUser } from "../controllers/users.js";
import express from "express";
import { catchAsync } from "../middleware/errorMiddleware.js";

export const router = express.Router();

router.post("/register", catchAsync(registerUser));

router.post("/login", catchAsync(loginUser));

router.get("/getme", catchAsync(getUser));

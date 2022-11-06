import { registerUser, loginUser, getUser } from "../controllers/users.js";
import express from "express";
import { catchAsync } from "../middleware/errorMiddleware.js";
import { validateUser } from "../middleware/validationMiddleware.js";
import { userSchema } from "../middleware/schemas.js";

export const router = express.Router();

router.post(
  "/register",
  validateUser(userSchema.register),
  catchAsync(registerUser)
);

router.post("/login", validateUser(userSchema.login), catchAsync(loginUser));

router.get("/getme", catchAsync(getUser));

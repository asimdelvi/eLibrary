import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
}).required();

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).required();

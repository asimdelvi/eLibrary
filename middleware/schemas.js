import Joi from "joi";

export const bookSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(5).max(200).required(),
  }).required(),
  files: Joi.object({
    book: Joi.object().required(),
    image: Joi.object().required(),
  }).required(),
}).required();

// Create an object for different request.
export const userSchema = {
  // Schema for login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required(),

  // Schema for register
  register: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required(),
};
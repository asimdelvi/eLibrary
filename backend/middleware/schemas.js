import Joi from "joi";

// TODO: optimize schema
export const bookSchema = {
  create: Joi.object({
    body: Joi.object({
      title: Joi.string().min(1).max(70).required(),
      description: Joi.string().max(200),
    }).required(),
    file: Joi.object().required(),
  }).required(),

  update: Joi.object({
    body: Joi.object({
      title: Joi.string().min(1).max(70),
      description: Joi.string().max(200),
    }),
    file: Joi.object().allow(null), // null is allowed if theres no object
    // title or book or description - any one should be included
  }).or("body.title", "body.description", "file.book"),
};

//

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

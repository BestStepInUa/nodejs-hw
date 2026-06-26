import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3).trim().messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.trim': 'Username cannot contain leading or trailing whitespace',
    }),
    email: Joi.string().email().trim().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.trim': 'Email cannot contain leading or trailing whitespace',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().trim().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.trim': 'Email cannot contain leading or trailing whitespace',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().trim().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.trim': 'Email cannot contain leading or trailing whitespace',
    }),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
    token: Joi.string().required().messages({
      'any.required': 'Token is required',
    }),
  }),
};

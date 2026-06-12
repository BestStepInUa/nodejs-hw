import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { emailRegexp } from '../constants/auth.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object()({
    email: Joi.string().regex(emailRegexp).required().messages({
      'string.pattern.base': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  }),
};

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';
import { noteSortFields } from '../models/note.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.integer': 'Per page must be an integer',
      'number.min': 'Per page must be at least 5',
      'number.max': 'Per page must be at most 20',
    }),
    sortBy: Joi.string()
      .valid(...noteSortFields)
      .default('_id')
      .messages({
        'string.valid': `Sort by must be one of the allowed fields: ${noteSortFields.join(', ')}`,
      }),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc').messages({
      'string.valid': 'Sort order must be either asc or desc',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.valid': 'Invalid tag',
      }),
    search: Joi.string().messages({
      'string.allow': 'Search must be a string',
    }),
  }),
};

export const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Note ID is invalid');
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'string.custom': 'Note ID is invalid',
      'string.required': 'Note ID is required',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.min': 'Title must be at least 1 character long',
      'string.required': 'Title is required',
    }),
    content: Joi.string().allow('').messages({
      'string.allow': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.valid': 'Invalid tag',
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'string.custom': 'Note ID is invalid',
      'string.required': 'Note ID is required',
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.min': 'Title must be at least 1 character long',
    }),
    content: Joi.string().allow('').messages({
      'string.allow': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.valid': 'Invalid tag',
      }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided for update',
    }),
};

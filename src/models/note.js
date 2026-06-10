import { Schema, model } from 'mongoose';

import { TAGS } from '../constants/tags.js';
import { handleMongooseError, setUpdateOptions } from './hooks.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
  },
  { versionKey: false, timestamps: true },
);

noteSchema.index({ tag: 1 });

noteSchema.post('save', handleMongooseError);
noteSchema.pre('findOneAndUpdate', setUpdateOptions);
noteSchema.post('findOneAndUpdate', handleMongooseError);

export const noteSortFields = Object.keys(noteSchema.paths);

export const Note = model('note', noteSchema);

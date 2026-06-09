import { Schema, model } from 'mongoose';

import { TAGS } from '../constants/tags.js';
import { handleMongooseError, setUpdateOptions } from './hooks.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      minLegth: 1,
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

noteSchema.post('save', handleMongooseError);
noteSchema.pre('findOneAndUpdate', setUpdateOptions);
noteSchema.post('findOneAndUpdate', handleMongooseError);

const Note = model('note', noteSchema);

export default Note;

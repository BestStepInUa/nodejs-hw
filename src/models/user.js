import { Schema, model } from 'mongoose';

import { handleMongooseError, setUpdateOptions } from './hooks.js';

import { emailRegexp } from '../constants/auth.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.index({ email: 1 });

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});
userSchema.post('save', handleMongooseError);
userSchema.pre('findOneAndUpdate', setUpdateOptions);
userSchema.post('findOneAndUpdate', handleMongooseError);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);

import { Schema, model } from 'mongoose';

import { handleMongooseError, setUpdateOptions } from './hooks.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      minlength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  { versionKey: false, timestamps: true },
);

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

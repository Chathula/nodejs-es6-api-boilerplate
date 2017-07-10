import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import { passwordReg } from './user.validation';
import constants from '../../config/contanats';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: '{VALUE} is not a valid email'
    }
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minLength: [6, 'Password is too short'],
    validate: {
      validator(password) {
        return passwordReg.test(password)
      },
      message: 'Enter a valid password'
    }
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }

  return next();
});

UserSchema.methods = {
  _hashPassword: function (password) {
    return hashSync(password);
  },
  _comparePassword: function (password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
      _id: this._id
    }, constants.JWT_SECRET)
  },
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      token: `Bearer ${this.createToken()}`
    }
  }
};

export default mongoose.model('User', UserSchema);

import mongoose from 'mongoose';
import { BaseModel } from './base.model.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export class UserModel extends BaseModel {
  constructor() {
    super(userSchema);
  }

  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async findByUsername(username) {
    return this.model.findOne({ username });
  }
} 
import mongoose from 'mongoose'
import { postSchema } from './Post.js'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema],
})

export const User = mongoose.model('User', userSchema)

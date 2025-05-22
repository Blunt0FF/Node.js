import mongoose from "mongoose";
import { transactionSchema } from './Transaction.js'


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
  initialBalance: {
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
    required: true,
    default: function () {
      return this.initialBalance;
    },
  },
  transactions: [transactionSchema],
});

const User = mongoose.model("User", userSchema)
export default User
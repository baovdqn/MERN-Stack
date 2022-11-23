import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },

  password: {
    type: String,
    required: true,
    max: 15,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

const User = mongoose.model("Users", userSchema, 'users');

export {
  User
}

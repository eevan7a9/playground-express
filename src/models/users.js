import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    age: Number,
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

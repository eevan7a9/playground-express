import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

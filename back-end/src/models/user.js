import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastname: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)
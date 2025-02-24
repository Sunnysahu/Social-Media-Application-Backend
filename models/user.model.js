import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      default: () => Math.random().toString(36).substring(7),
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [20, "Password can be at most 20 characters"],
    },
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [50, "Full name can be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.User || mongoose.model("User", userSchema);

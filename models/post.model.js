//Create post Schema

import mongoose, { Schema } from "mongoose";

// Incorrect username field

// You are setting username as an ObjectId that references User.
// It should be a String, not an ObjectId, because usernames are not MongoDB _ids.

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
      trim: true,
      index: true,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Username is Required"],
      unique: true,
      trim: true,
      index: true,
    },
    profilePhoto: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postImageOrText: {
      type: String,
      required: [true, "Image or Text String is Required"],
    },
    postCaption: {
      type: String,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
    shares: {
      type: Schema.Types.ObjectId,
      ref: "Share",
    },
  },
  { timestamps: true }
);

export default mongoose.model.Post || mongoose.model("Post", postSchema);

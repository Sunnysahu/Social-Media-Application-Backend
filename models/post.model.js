//Create post Schema

import mongoose, { Schema } from "mongoose";

// Incorrect username field

// You are setting username as an ObjectId that references User.
// It should be a String, not an ObjectId, because usernames are not MongoDB _ids.

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
      trim: true,
      index: true,
    },
    postType: {
      type: String,
      enum: ["text", "image", "pdf"],
      required: [true, "Image or Text String is Required"],
    },
    postText: {
      type: String,
    },
    media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    likes: [
      {
        type: Schema.Types.ObjectId, // _id will be stored Here in the array
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },

    shares: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model.Post || mongoose.model("Post", postSchema);

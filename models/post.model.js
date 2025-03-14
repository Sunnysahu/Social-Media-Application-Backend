//Create post Schema

import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is Required"],
    trim: true,
    index: true,
  },
  username: {
    type: Schema.type.ObjectId,
    ref: "User",
    required: [true, "Username is Required"],
    unique: true,
    trim: true,
    index: true,
  },
  profilePhoto: {
    type: Schema.type.ObjectId,
  },
  postImage: {
    type: String,
    required: [true, "Image String is Required"],
  },
  postCaption: {
    type: String,
  },
  comments : {
    type: Schema.type.ObjectId,
    ref: "Comment",
  },
  likes : {
    type : Schema.type.ObjectId,
    ref: "Like"
  },
  shares : {
    type : Schema.type.ObjectId,
    ref: "Share"
  }
}, {timestamps: true});

export default mongoose.model.Post || mongoose.model("Post", postSchema);
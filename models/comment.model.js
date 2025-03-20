import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is Required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
    },
    text: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model.Comment ||
  mongoose.model("Comment", commentSchema);

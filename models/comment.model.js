import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    // post: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Post",
    //   required: [true, "Post is Required"],
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is Required"],
    },
    text: {
      type: String,
      required: [true, "Comment content is required"],
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
    },
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    replyCount: {
      type: Number,
    },
    media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

export default mongoose.model.Comment ||
  mongoose.model("Comment", commentSchema);

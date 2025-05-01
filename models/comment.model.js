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
    replyTo: { type: Schema.Types.ObjectId, ref: "Comment" },
    media: [{ type: Schema.Types.ObjectId, ref: "Media" }],

    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

commentSchema.post("save", async function (doc, next) {
  try {
    // Only increment if it's a top-level comment (not a reply)
    if (!doc.replyTo && doc.postId) {
      await Post.findByIdAndUpdate(doc.postId, {
        $inc: { commentCount: 1 },
        $push: { comments: doc._id },
      });
    }
    next();
  } catch (err) {
    console.error("Error in comment post-save hook:", err);
    next(err);
  }
});

export default mongoose.model.Comment ||
  mongoose.model("Comment", commentSchema);

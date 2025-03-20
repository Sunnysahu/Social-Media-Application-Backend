import mongoose, { Schema } from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model.Share || mongoose.model("Share", shareSchema);

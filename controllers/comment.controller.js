import mongoose from "mongoose";

import { apiError, apiResponse } from "../utils/apiError.js";

import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

import { verifyToken } from "../utils/JWT.js";

const createComment = async (req, res) => {
  const verifiedUser = verifyToken(req.body?.token);

  if (!verifiedUser) {
    return res.json(
      new apiError(404, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

  console.log("User", verifiedUser._doc);

  try {
    const { id } = req.params;
    const { text, media, reply } = req.body;

    console.log("Id", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(
        new apiError(400, "Invalid Post ID", "Please provide a valid Post ID")
      );
    }

    console.log("here");

    const post = await Post.findById(id);

    if (!post) {
      return res.json(new apiError(404, "No post found", "No Post Available"));
    }
    console.log("Post", post);

    const comment = await Comment.create({
      user: verifiedUser._doc._id,
      text: text,
      like: [],
      likeCount: 0,
      reply: [],
      replyCount: 0,
      media: media || [],
    });
    console.log("comment", comment);

    if (!comment) {
      return res.json(
        new apiError(500, "Server Not Responding", "Something is Wrong!!!")
      );
    }

    const updatePostComment = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: comment._id },
        $inc: { commentCount: 1 },
      },
      { new: true }
    );

    if (!updatePostComment) {
      return res.json(
        new apiError(500, "Server Issue...", "Something is Wrong!!!")
      );
    }

    return res.json(
      new apiResponse(201, comment, "Comment created successfully...")
    );
  } catch (error) {
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
};

// const error = () => {
//   return res.json(
//     new apiError(500, "Server Issue...", "Something is Wrong!!!")
//   );
// };

export default createComment;

const replyComment = async (req, res) => {
  const verifiedUser = verifyToken(req.body?.token);
  if (!verifiedUser) {
    return res.json(
      new apiError(404, "Unauthorized Access!!!", "Token Not Found")
    );
  }
  try {
    const { id } = req.params;
    const { text, media, postId } = req.body;
    console.log("Reply", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(
        new apiError(400, "Invalid Post ID", "Please provide a valid Post ID")
      );
    }
    const replyComment = await Comment.create({
      user: verifiedUser._doc._id,
      text: text,
      like: [],
      likeCount: 0,
      reply: [],
      replyCount: 0,
      media: media || [],
      replyTo: id,
    });

    if (!replyComment) {
      return res.json(
        new apiError(500, "Server Issue...", "Something is Wrong!!!")
      );
    }
    const updatedComment = await Comment.findByIdAndUpdate(id, {
      $push: { reply: replyComment._id },
      $inc: { replyCount: 1 },
    });
    if (!updatedComment) {
      return res.json(
        new apiError(500, "Server Issue...", "Something is Wrong!!!")
      );
    }
    console.log("Here", updatedComment);
    const updatePostCommentCount = await Post.findByIdAndUpdate(
      verifiedUser._doc._id,
      {
        $inc: { commentCount: 1 },
      }
      // ,
      // { new: true }
    );
    console.log("Here1", updatePostCommentCount);
    if (updatePostCommentCount) {
      return res.json(
        new apiError(500, "Server Issue...", "Something is Wrong!!!")
      );
    }
    return res.json(
      new apiResponse(201, replyComment, "Comment created successfully...")
    );
  } catch (error) {
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
};

export { createComment, replyComment };

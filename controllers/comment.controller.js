import { apiError, apiResponse } from "../utils/apiError.js";

import Comment from "../../models/comment.model.js";

import { verifyToken } from "../utils/JWT.js";

const createComment = async (req, res) => {
  const { postId } = req.body;

  const commnet = await Comment.create({});

  const user = 2;
};

export default createComment;

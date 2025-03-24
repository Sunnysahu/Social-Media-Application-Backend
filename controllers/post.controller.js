import { apiError, apiResponse } from "../utils/apiError.js";

import Post from "../models/post.model.js";

import { verifyToken } from "../utils/JWT.js";

async function createPost(req, res) {
  const verify = verifyToken(req.body?.token);

  console.log("verify :: ", verify);

  if (!verify) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }
  const { postImageorText, postCaption } = req.body;
  const { user, username } = verify;

  console.log("user and username : ", user, username);

  const post = await Post.create({});

  return res.json(new apiError(401, verify, "Token Not Valid..."));
}
async function getAllPost(req, res) {
  const allPost = await Post.find();

  if (!allPost.length) {
    return res.json(
      new apiError(404, "No post found!!!", "No Post Available!!!")
    );
  }

  return res.json(
    new apiResponse(200, allPost, "All Posts Feteched Successfully...")
  );
}

async function getPostById(req, res) {
  const { id } = await req.params;

  try {
    const post = await Post.Find({ _id: id });

    if (!post) {
      return res.json(new apiError(404, "No post found", "No Post Available"));
    }

    return res.json(
      new apiResponse(200, postMessage, "Post Succesfully Feteched...")
    );
  } catch (error) {
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
}

export { getAllPost, getPostById, createPost };

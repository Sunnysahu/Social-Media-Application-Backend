import { apiError, apiResponse } from "../utils/apiError.js";

import Post from "../models/post.model.js";

import { verifyToken } from "../utils/JWT.js";

const checkJWT = async (req, res) => {
  const token = req.body?.token;
  const result = verifyToken(token);

  if (!result || result == null) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }
  // console.log("Res :: ", result._doc);

  console.log("Now Here");

  return result._doc;
};

async function createPost(req, res) {
  const verifiedUser = verifyToken(req.body?.token);

  if (!verifiedUser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

  const verify = verifiedUser._doc;
  console.log("verify :: ", verify);

  // const { postImageorText, postCaption } = req.body;
  const { _id, username } = verify;
  const { postText, postType } = req.body;

  console.log("user and username : ", _id, username);
  console.log("text", postText);
  console.log("text2", postType);

  try {
    const post = await Post.create({
      userId: _id,
      postText: postText,
      postType: postType,
    });

    return res.json(
      new apiResponse(200, { post: post._doc, verify }, "Post Created...")
    );
  } catch (error) {
    console.error("Error Log", error.message);
    return res.json(
      new apiError(401, "Error While Creating the Post", "Post not Created!!!")
    );
  }
}

async function getAllPost(req, res) {
  const checkuser = verifyToken(req.body?.token);

  if (!checkuser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

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
  const verifiedUser = verifyToken(req.body?.token);

  console.log("Dock", verifiedUser);

  if (!verifiedUser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

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

async function deletePostById(req, res) {}

export { getAllPost, getPostById, createPost, deletePostById };

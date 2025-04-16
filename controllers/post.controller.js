import mongoose from "mongoose";
import { apiError, apiResponse } from "../utils/apiError.js";

import Post from "../models/post.model.js";

import { verifyToken } from "../utils/JWT.js";
import { json } from "express";

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
  // The variable should match with the postman or frontend you're passing

  const { postText, postType } = req.body;

  console.log("user and username : ", _id, username);
  console.log("text", postText);
  console.log("text2", postType);

  try {
    // Example --> NAME_IN_SCHEMA : FORNTEND_VARIABLE_NAME
    const post = await Post.create({
      userId: _id,
      postText: postText,
      postType: postType,
      media: [],
      likes: [], // Can leave blank as its already an array as per the schema
      likeCount: 0, // Already Initialled with 0
      comments: [],
      commentCount: 0,
      shares: [],
      sharesCount: 0,
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

  console.log("Dock", verifiedUser._doc);

  if (!verifiedUser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(
        new apiError(400, "Invalid Post ID", "Please provide a valid Post ID")
      );
    }
    console.log("Id", id);

    const post = await Post.findById(id);

    if (!post) {
      return res.json(new apiError(404, "No post found", "No Post Available"));
    }
    console.log("Post", post);

    return res.json(new apiResponse(200, post, "Post Succesfully Feteched..."));
  } catch (error) {
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
}

async function updatePostById(req, res) {
  console.log("Here");

  const verifiedUser = verifyToken(req.body?.token);

  if (!verifiedUser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

  const { id } = req.params;

  // Checking this as ID can be Invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json(
      new apiError(400, "Invalid Post ID", "Please provide a valid Post ID")
    );
  }
  const { postType, postText, media } = req.body;

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { postText: postText, postType: postType, media: media },
    { new: true } // return updated doc & validate
  );

  return res.json(
    new apiResponse(200, updatedPost, "Post Updated Succesfully...")
  );
}

async function deletePostById(req, res) {
  const verifiedUser = verifyToken(req.body?.token);

  if (!verifiedUser) {
    return res.json(
      new apiError(401, "Unauthorized Access!!!", "Token Not Valid...")
    );
  }

  try {
    const { id } = req.params;

    const deletePost = await Post.findByIdAndDelete(id);

    if (!deletePost) {
      return res.json(new apiError(404, "No post found", "No Post Available"));
    }

    console.log("Post", deletePost);

    return res.json(
      new apiResponse(200, deletePost, "Post Deleted Succesfully")
    );
  } catch (error) {
    return res.json(
      new apiError(500, "Server Issue...", "Something is Wrong!!!")
    );
  }
}

export { getAllPost, getPostById, createPost, deletePostById, updatePostById };

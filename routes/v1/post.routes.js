import express from "express";

import {
  getAllPost,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
  likePost,
} from "../../controllers/post.controller.js";

import { verifyJWT } from "../../services/verifyJWT.js";
const router = express.Router();

router.get("/", getAllPost);

router.post("/create", createPost);

router.get("/getPost/:id", verifyJWT, getPostById); //Create this in controller
router.post("/updatePost/:id", verifyJWT, updatePostById); //Create this in controller
router.delete("/deletePost/:id", verifyJWT, deletePostById); //Create this in controller

router.post("/likePost/:id", likePost);

export default router;

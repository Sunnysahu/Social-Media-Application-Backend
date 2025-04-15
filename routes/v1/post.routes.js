import express from "express";

import {
  getAllPost,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
} from "../../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPost);

router.post("/create", createPost);

router.get("/getPost/:id", getPostById); //Create this in controller
router.post("/updatePost/:id", updatePostById); //Create this in controller
router.delete("/deletePost/:id", deletePostById); //Create this in controller

export default router;

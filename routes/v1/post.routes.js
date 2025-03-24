import express from "express";

import {
  getAllPost,
  getPostById,
  createPost,
} from "../../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPost);

router.get("/create", createPost);

router.get("/updatePost/:id", getPostById);
router.get("/deletePost/:id", getPostById);

export default router;

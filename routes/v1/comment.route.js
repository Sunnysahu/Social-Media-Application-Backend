// Add routes for create update delete
import express from "express";
import {
  createComment,
  replyComment,
} from "../../controllers/comment.controller.js";
const router = express.Router();

router.post("/createComment/:id", createComment);
router.post("/replyComment/:id", replyComment);

export default router;

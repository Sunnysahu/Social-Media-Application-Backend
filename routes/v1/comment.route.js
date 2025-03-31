// Add routes for create update delete
import express from "express";

import { createComment } from "../../controllers/comment.controller.js";

const router = express.Router();

router.get("/", createComment);

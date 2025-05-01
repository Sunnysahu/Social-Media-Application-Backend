import express from "express";

import { verifyJWT } from "../../services/verifyJWT.js";

import {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyJWT, getAllUsers);
router.get("/getUserByID/:id", verifyJWT, getUserByID);
router.put("/updateUserByID/:id", verifyJWT, updateUser);
router.delete("/deleteUser/:id", verifyJWT, deleteUser);

// create more routes

export default router;

import express from "express";

import {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/getUserByID/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

// create more routes

export default router;

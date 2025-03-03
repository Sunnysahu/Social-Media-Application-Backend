import express from "express";

import {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller.js";
import { isLogged } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isLogged, getAllUsers);
router.get("/getUserByID/:id", isLogged, getUserByID);
router.put("/:id", isLogged, updateUser);
router.delete("/deleteUser/:id", isLogged, deleteUser);

// create more routes

export default router;

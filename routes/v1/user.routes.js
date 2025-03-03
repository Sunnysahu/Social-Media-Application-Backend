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
router.get("/getUserByID/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

// create more routes

export default router;

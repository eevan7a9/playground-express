import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  signInUser,
} from "../controllers/users.js";

const router = express.Router();

// Get all users root
router.get("/", getUsers);
// Add new user
router.post("/", createUser);
// Get single user by id
router.get("/:id", getUser);
// Update single user by id
router.patch("/:id", isAuthenticated, updateUser);
// Delete single user by id
router.delete("/:id", deleteUser);
// Signin user
router.post("/signin", signInUser);

export default router;

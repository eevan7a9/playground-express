import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

// Get all users root
router.get("/", getUsers);
// Add new user
router.post("/", createUser);
// Get single user by id
router.get("/:id", getUser);
// Update single user by id
router.patch("/:id", updateUser);
// Delete single user by id
router.delete("/:id", deleteUser);
export default router;

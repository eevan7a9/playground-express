import express from "express";
import { users } from "../dummy-data/users.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

// users root
router.get("/", (_, res) => {
  console.log("Getting all users...");
  res.send(users);
});
// New user
router.post("/", (req, res) => {
  console.log("Adding new user");
  const user = {
    id: uuidv4(),
    ...req.body,
  };
  users.push(user);
  res.send({
    message: "Success: New user added.",
    data: user,
  });
});
// single user by id
router.get("/:id", (req, res) => {
  console.log("Getting single user...");
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (user) {
    res.send(user);
    return;
  }
  res.send({
    message: "Error: User not found.",
  });
});

export default router;

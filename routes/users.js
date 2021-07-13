import express from "express";
import { users } from "../dummy-data/users.js";

const router = express.Router();

// users root
router.get("/", (_, res) => {
  console.log("Getting all users...");
  res.send(users);
});
// New user
router.post("/", (req, res) => {
  console.log("Adding new user");
  users.push(req.body);
  res.send({
    ...{
      message: "Success: New user added.",
    },
    data: req.body,
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

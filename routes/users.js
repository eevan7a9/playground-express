import express from "express";
import { dummyUsers } from "../dummy-data/users.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
let users = dummyUsers;
// Get all users root
router.get("/", (_, res) => {
  console.log("Getting all users...");
  res.send({ users });
});
// Add new user
router.post("/", (req, res) => {
  console.log("Adding new user");
  const user = {
    id: uuidv4(),
    ...req.body,
  };
  users.push(user);
  res.send({
    message: "Success: New user added.",
    user,
  });
});
// Get single user by id
router.get("/:id", (req, res) => {
  console.log("Getting single user...");
  const user = users.find((user) => user.id === req.params.id.toString());
  if (user) {
    res.send(user);
    return;
  }
  res.send({
    message: "Error: User not found.",
  });
});
// Update single user by id
router.patch("/:id", (req, res) => {
  console.log("Updating new user...");
  let message = "user not found";
  let foundUser = users.find((user) => user.id == req.params.id);
  const { firstName, lastName, age } = req.body;
  if (foundUser) {
    message = "found user";
    firstName && (foundUser.firstName = firstName);
    lastName && (foundUser.lastName = lastName);
    age && (foundUser.age = age);
  }
  res.send({ message, user: foundUser });
});
// Delete single user by id
router.delete("/:id", (req, res) => {
  console.log("Deleting user...");
  let message = "user not found";
  const foundUser = users.find((user) => user.id == req.params.id);
  if (foundUser) {
    message = "found user, is now deleted.";
    users = users.filter((user) => user.id != foundUser.id);
  }
  res.send({ message, user: foundUser });
});
export default router;

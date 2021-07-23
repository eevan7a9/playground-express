import { dummyUsers } from "../dummy-data/users.js";
import { v4 as uuidv4 } from "uuid";

import { User } from "../models/users.js";
let users = dummyUsers;

export const getUsers = function (req, res) {
  console.log("Getting all users...");
  // find all users
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.send({ message: `${err.reason}` });
      return;
    }
    res.send({
      message: "Success: Fetched all users.",
      users,
    });
  });
};

export const createUser = function (req, res) {
  console.log("Adding new user...");

  const { firstName, lastName, age } = req.body;
  const user = new User({ firstName, lastName, age });
  const message = "Success: New user added.";
  // saving to database
  user.save((err, doc) => {
    if (err) {
      console.log(err);
      res.send({ message: `${err.reason}` });
      return;
    }
    res.send({
      message,
      data: doc,
    });
  });
};

export const getUser = function (req, res) {
  console.log("Getting single user...");
  const _id = req.params.id;
  // Finding by ID
  User.findById({ _id }, (err, user) => {
    if (err) {
      console.log(err);
      res.send({ message: `${err.reason}` });
      return;
    }
    res.send({
      message: "Success: Fetch single user.",
      data: user,
    });
  });
};

export const updateUser = function (req, res) {
  console.log("Updating new user...");
  let message = "Error: user not found.";
  let foundUser = users.find((user) => user.id == req.params.id);
  const { firstName, lastName, age } = req.body;
  if (foundUser) {
    message = "found user";
    firstName && (foundUser.firstName = firstName);
    lastName && (foundUser.lastName = lastName);
    age && (foundUser.age = age);
  }
  res.send({ message, user: foundUser });
};

export const deleteUser = function (req, res) {
  console.log("Deleting user...");
  let message = "Error: user not found.";
  const foundUser = users.find((user) => user.id == req.params.id);
  if (foundUser) {
    message = "Success: found user, is now deleted.";
    users = users.filter((user) => user.id != foundUser.id);
  }
  res.send({ message, user: foundUser });
};

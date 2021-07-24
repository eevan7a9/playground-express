import { User } from "../models/users.js";

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
  const _id = req.params.id;
  const { firstName, lastName, age } = req.body;

  User.findOneAndUpdate(
    { _id }, // ID
    {
      $set: {
        // Fields to update
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(age !== undefined && { age }),
      },
    },
    { useFindAndModify: false, new: true }, // options
    (err, user) => {
      if (err) {
        console.log(err);
        res.send({ message: err.reason });
        return;
      }
      res.send({
        message: "Success: Updated single user",
        data: user,
      });
    }
  );
};

export const deleteUser = function (req, res) {
  console.log("Deleting user...");
  const _id = req.params.id;

  User.findOneAndDelete({ _id }, (err, user) => {
    if (err) {
      console.log(err);
      res.send({ message: err.reason });
      return;
    }
    res.send({
      message: "Success: User is deleted.",
      data: user,
    });
  });
};

import { User } from "../models/users.js";

export const getUsers = function (req, res) {
  console.log("Getting all users...");
  // find all users
  User.find({})
    .then((result) => {
      res.send({
        message: "Success: Fetched all users.",
        data: result,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
    });
};

export const createUser = function (req, res) {
  console.log("Adding new user...");

  const { firstName, lastName, age } = req.body;
  const newUser = new User({ firstName, lastName, age });
  // saving to database
  newUser
    .save()
    .then((result) => {
      res.status(201).send({
        message: "Success: New user added.",
        data: result,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
    });
};

export const getUser = function (req, res) {
  console.log("Getting single user...");
  const _id = req.params.id;
  // Finding by ID
  User.findById({ _id })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Error: User not found.",
        });
        return;
      }
      res.send({
        message: "Success: Fetch single user.",
        data: result,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      }
    });
};

export const updateUser = function (req, res) {
  console.log("Updating new user...");
  const _id = req.params.id;
  const { firstName, lastName, age } = req.body;
  const $set = {
    // Fields to update
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(age !== undefined && { age }),
  };
  User.findOneAndUpdate(
    { _id }, // ID
    { $set },
    { useFindAndModify: false, new: true } // options
  )
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Error: User not found.",
        });
        return;
      }
      res.send({
        message: "Success: Updated single user",
        data: result,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(422).send(err);
        return;
      }
    });
};

export const deleteUser = function (req, res) {
  console.log("Deleting user...");
  const _id = req.params.id;

  User.findOneAndDelete({ _id })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Error: User not found.",
        });
        return;
      }
      res.send({
        message: "Success: User is deleted.",
        data: result,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        res.status(422).send({ message: err.reason });
        return;
      }
    });
};

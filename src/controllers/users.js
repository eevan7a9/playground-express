import bcrypt from "bcrypt";
import { User } from "../models/users.js";

export const getUsers = function (_, res) {
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

export const createUser = async function (req, res) {
  console.log("Adding new user...");

  const { firstName, lastName, age, email, password } = req.body;
  try {
    // Hashing password
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName,
      lastName,
      age,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    // saving to database
    const user = await newUser.save();
    res.status(201).send({
      message: "Success: New user added.",
      data: user,
    });
  } catch (err) {
    if (err) {
      console.log(err);
      res.status(400).send({ err, message: err.message });
      return;
    }
  }
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
  const { firstName, lastName, age, email } = req.body;
  const $set = {
    // Fields to update
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(age !== undefined && { age }),
    ...(email !== undefined && { email: email.toLowerCase() }),
  };
  User.findOneAndUpdate(
    { _id }, // ID
    { $set },
    { useFindAndModify: false, new: true, runValidators: true } // options
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

export const signInUser = async function (req, res) {
  console.log("Sign-in user...");

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(404).send({ message: "Error: User not found." });
      return;
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(401).send({ message: "Error: Invalid password." });
      return;
    }
    res.send({ message: "You are logged-in" });
    return;
  } catch (err) {
    res.status(400).send(err);
    return;
  }
};

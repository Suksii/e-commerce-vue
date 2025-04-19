import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({ email });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    if (emailExists) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = bcrypt.genSaltSync(10);

    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(201).send({ newUser, message: "User created successfully" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Username does not exist" });
    }
    const passMatch = bcrypt.compareSync(password, user.password);

    if (!passMatch) {
      return res.status(406).json({ message: "Password is not valid" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      {}
    );

    res.cookie("token", token).json({ user, message: "Login successful" });
  } catch (error) {
    res.status(422).json(error);
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out" });
  } catch (error) {
    res.json(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const sortField = req.query.sortBy || "username";
    const sortOrder = req.query.order === "asc" ? 1 : -1;
    const users = await User.find().sort({ [sortField]: sortOrder });
    res.json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  try {
    const usernameExists = await User.findOne({ username, _id: { $ne: id } });
    if (usernameExists) {
      return res.json({ message: "Username has already been taken" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { username },
      },
      { new: true }
    );
    res.json({ message: "Username successfully changed", user: updatedUser });
  } catch (error) {
    res.json({ message: "Internal server error", error });
  }
};

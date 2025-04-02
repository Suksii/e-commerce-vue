import { User } from "../modules/User.js";
import bycrypt from "bcryptjs";

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
    const salt = bycrypt.genSaltSync(10);
    const hashedPassword = bycrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
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
    if (user.password !== password) {
      return res.status(406).json({ message: "Password is not valid" });
    }
    res.status(201).send({ user });
  } catch (error) {
    res.status(422).json(error);
  }
};

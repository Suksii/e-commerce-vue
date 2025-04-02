import { User } from "../modules/User.js";

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
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

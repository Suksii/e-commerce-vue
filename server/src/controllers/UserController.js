import { UserSchema as User } from "../modules/User";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.send(user);
  } catch (error) {
    res.status(422).json(error);
  }
};

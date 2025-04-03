import jwt from "jsonwebtoken";
import { User } from "../src/modules/User";

export const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }
      const userProfile = await User.findById(decoded.id).select("-password");
      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = userProfile;

      next();
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

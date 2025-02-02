import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import asyncHandler from "express-async-handler";  // Correct import

export const ProtectedRoutes = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized - No Token Provided" });
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ msg: "Unauthorized - Invalid Token" });
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized - User Not Found" });
  }
  req.user = user;
  next();
});

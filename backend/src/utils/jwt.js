import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
};

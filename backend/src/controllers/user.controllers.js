import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { generateAccessToken } from "../utils/jwt.js";
// import { sendVerificationOptToken } from "../nodemailer/nodemail.config.js";

// signup
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password with explicit salt rounds
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
  });

  // Generate access token and set cookie
  generateAccessToken(user._id, res);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    message: "Registration successful", // Fixed syntax error
  });
});


// Verify Email
// export const verifyEmail = asyncHandler(async (req, res) => {
//   const {verificationOtpToken } = req.body;

//   // Check if token is provided
//   if (!verificationOtpToken) {
//     return res.status(400).json({ message: "Verification token is required" });
//   }

//   // Find user with matching token and check expiration
//   const user = await User.findOne({
//     verificationOtpToken,
//     verificationTokenExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Invalid or expired verification token" });
//   }

//   // Mark user as verified
//   user.verificationOtpToken = undefined;
//   user.verificationTokenExpire = undefined;
//   user.isVerified = true;

//   await user.save();

//   res.status(200).json({ message: "Email verified successfully" });
// });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist. Please register first." });
  }

  // Check password match
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Incorrect email or password" });
  }

  // Generate access token and set cookie
  generateAccessToken(user._id, res);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    message: "Logged in  successfully",
  });
});

// Logout User
export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// checkAuth
export const checkAuth = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.params; // Extract email from route parameter
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await User.deleteOne({ email });
  res.status(200).json({ message: "User deleted successfully" });
});



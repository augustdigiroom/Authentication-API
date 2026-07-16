const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, getProfile);

// Email verification route
router.get("/verify/:token", verifyEmail);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password/:token", resetPassword);

module.exports = router;

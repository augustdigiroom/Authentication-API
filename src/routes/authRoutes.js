const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyEmail,
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

module.exports = router;

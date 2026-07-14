const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/email");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Duplicate email check

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hashing the password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Generate a verification token for email verification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false, // Set to false until email is verified
    });

    // save user to database
    await newUser.save();

    // Send verification email
    const verificationLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;

    // Send verification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Verify Your Email",
      html: `
    <h2>Welcome to our Authentication API!</h2>

    <p>Thank you for registering.</p>

    <p>Please click the link below to verify your email address.</p>

    <a href="${verificationLink}">
      Verify Email
    </a>
  `,
    });

    // Return success response

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // Wrong password
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Password correct
    // return res.status(200).json({
    //   success: true,
    //   message: "Password verified. Ready to generate JWT.",
    // });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected profile route.",
    user: req.user,
  });
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with matching verification token
    const user = await User.findOne({
      verificationToken: token,
    });

    // Token not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token.",
      });
    }

    // Verify the user
    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyEmail,
};

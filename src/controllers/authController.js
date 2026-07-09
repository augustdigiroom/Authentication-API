const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validdate required fields
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Email validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

     // Duplicate email check

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email is already registered."
        });
    }

    // Hashing the password 

    const hashedPassword = await bcrypt.hash(password, 10);

    return res.status(200).json({
        success: true,
        message: "Password hashed successfully.",
        hashedPassword
    });
};

module.exports = {
    registerUser
};
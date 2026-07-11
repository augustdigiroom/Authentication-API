const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    // We'll add logic here
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
  }
};

module.exports = protect;

const jwt = require("jsonwebtoken");

// Middleware to protect private routes
const protect = async (req, res, next) => {
  try {
    // Read the Authorization header
    const authHeader = req.headers.authorization;

    // Check if a token was sent
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing.",
      });
    }

    // Ensure correct format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // Extract the JWT
    const token = authHeader.split(" ")[1];

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user's data
    // to the request object
    req.user = decoded;

    // Continue to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized.",
    });
  }
};

module.exports = protect;

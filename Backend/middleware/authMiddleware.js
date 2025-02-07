const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user data to request
    next(); // ✅ Proceed to next middleware
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

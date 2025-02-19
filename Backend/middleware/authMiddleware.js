const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }

        req.user = { id: decoded.id }; // ✅ Attach only the user ID
        console.log("✅ Extracted User ID from Token:", req.user.id);
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

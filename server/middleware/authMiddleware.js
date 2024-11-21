const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Typing ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

const blacklist = new Set(); // In-memory store (use Redis or DB in production)

const isBlacklisted = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (blacklist.has(token)) {
    return res
      .status(403)
      .json({ error: "Token is invalidated. Please sign in again." });
  }

  next();
};
module.exports = { authorize, isBlacklisted };

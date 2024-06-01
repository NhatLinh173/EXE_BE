const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization token is required",
    });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;

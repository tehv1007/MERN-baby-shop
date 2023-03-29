const jwt = require("jsonwebtoken");
const { createError } = require("./error");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is invalid!"));
    req.user = user;
    next();
  });
};

// Hàm middleware xác thực token
exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  // Kiểm tra token có tồn tại và hợp lệ
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.userId = decodedToken.userId;
      next();
    }
  });
};

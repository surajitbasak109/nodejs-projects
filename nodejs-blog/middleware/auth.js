const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifytoken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_KEY);
};
module.exports = (req, res, next) => {
 
  const bearerToken = req?.headers?.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).json({ status: "faied", message: "hhello" });

  const token = bearerToken.split(" ")[1];
  const user = verifytoken(token);

  
  if (!user)
    return res.status(400).json({
      status: "failed",
      message: "please provide a valid token",
    });

  req.user = user;

 
  return next();
};

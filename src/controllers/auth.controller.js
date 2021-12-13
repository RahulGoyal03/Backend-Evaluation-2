const User = require("../models/user.model");
const express = require("express");
require("dotenv").config();
const upload = require("../middlewares/multer");
const jwt = require("jsonwebtoken");
const router = express.Router();
const newtoken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};
router.post(
  "/register",
  upload.single("profile_photo_url"),
  async (req, res) => {
    try {
      //check if user already exist
      let user = await User.findOne({ email: req.body.email }).lean().exec();
      if (user)
        return res.status(400).json({
          message: "Please provide different email",
          Status: "Failed",
        });
      // create user
      // user = await User.create(req.body);
      // return token
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile_photo_url: req.file.path,
        roles: req.body.roles,
      });
      const token = newtoken(user);
      //return token and body
      return res.status(201).send({ user, token });
    } catch (e) {
      return res.status(500).json({ message: e.message, Status: "Failed" });
    }
  }
);
router.post("/login", async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await User.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!user)
      return res.status(400).json({
        status: "failed",
        message: "Please provide correct email address and password",
      });

    // else we match the password
    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match)
      return res.status(400).json({
        status: "failed",
        message: "Please provide correct email address and password",
      });

    // if it matches then create the token
    const token = newtoken(user);

    // return the user and the token
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

module.exports = router;

const express = require("express");
const Users = require("../models/movie.model");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");
const router = express.Router();
router.post("", authenticate, upload.single("poster_url"), async (req, res) => {
  try {
    // const user = req.user;
    const post = await Users.create({
      name: req.body.name,
      languages: req.body.languages,
      directors: req.body.directors,
      poster_url: req.file.path,
      actors: req.body.actors,
    });
    return res.status(200).json({ post });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});
//get /movies ( get all movies for a particular actor )
router.get("", async (req, res) => {
  const d = await Users.find().lean().exec();
  return res.status(200).send({ d });
});

module.exports = router;

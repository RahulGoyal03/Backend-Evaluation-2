const express = require("express");
const Users = require("../models/show.model");
const router = express.Router();
router.post("", async (req, res) => {
  const showm = await Users.create(req.body);
  return res.status(200).send({ showm });
});
// get /shows ( get all shows for a particular movie )//done
router.get("/:name", async (req, res) => {
  const d = await Users.find().populate("movie").lean().exec();
  let Perticular_movie = [];
  d.forEach((ds) => {
    if (ds.movie.name == req.params.name) {
      Perticular_movie.push(ds);
    }
  });
  return res.status(200).send({ Perticular_movie });
});
// get /shows/nearest ( get all shows of a movie in the same location as the user with seat available )
router.get("/", async (req, res) => {
  const d = await Users.find()
    .populate("movie")
    .populate("screen")
    .lean()
    .exec();
  //   let Perticular_movie = [];
  //   d.forEach((ds) => {
  //     if (ds.movie.name == req.params.name) {
  //       Perticular_movie.push(ds);
  //     }
  //   });
  return res.status(200).send({ d });
});

module.exports = router;

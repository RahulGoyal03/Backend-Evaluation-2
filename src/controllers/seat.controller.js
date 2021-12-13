const express = require("express");
const Users = require("../models/seat.model");
const router = express.Router();
router.post("", async (req, res) => {
  const seats = await Users.create(req.body);
  return res.status(200).send({ seats });
});
// get /seats ( get all available seats for a show )
router.get("", async (req, res) => {
  const d = await Users.find().populate("show").lean().exec();

  d.forEach((ds) => {
    // console.log(ds.show.total_seats);
    return res.status(200).send({ availableseats: ds.show.total_seats });
  });
});
//post /seat ( book seats for users and first check if the number of seats required by user is available and if yes then book it )
router.get("/:seats", async (req, res) => {
  const d = await Users.find().populate("show").lean().exec();
  //   console.log(typeof +req.params.seats);

  d.forEach((ds) => {
    if (ds.show.total_seats >= +req.params.seats) {
      return res.status(200).send({
        avalilable: ds.show.total_seats,
        needed: +req.params.seats,
        message: "you can book the tickets",
      });
    } else {
      return res.status(500).send({
        avalilable: ds.show.total_seats,
        needed: +req.params.seats,
        message: "we dont have enough seats",
      });
    }
  });
});
module.exports = router;

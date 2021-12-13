const express = require("express");
const Users = require("../models/theatre.model");
const router = express.Router();
router.post("", async (req, res) => {
  const t = await Users.create(req.body);
  return res.status(200).send({ t });
});
module.exports = router;

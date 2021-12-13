const express = require("express");
const Users = require("../models/screen.model");
const router = express.Router();
router.post("", async (req, res) => {
  const s = await Users.create(req.body);
  return res.status(200).send({ s });
});
module.exports = router;

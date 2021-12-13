const mongoose = require("mongoose");
const seatschema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: "show", required: true },
});
module.exports = mongoose.model("seat", seatschema);

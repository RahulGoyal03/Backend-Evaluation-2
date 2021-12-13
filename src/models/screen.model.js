const mongoose = require("mongoose");
const screenschema = new mongoose.Schema({
  name: { type: String, required: true },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theatre",
    required: true,
  },
});
module.exports = mongoose.model("screen", screenschema);

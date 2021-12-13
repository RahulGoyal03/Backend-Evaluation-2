const mongoose = require("mongoose");
const showschema = new mongoose.Schema({
  timing: { type: Date },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },

  total_seats: { type: Number, required: true },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "screen",
    required: true,
  },
});
module.exports = mongoose.model("show", showschema);

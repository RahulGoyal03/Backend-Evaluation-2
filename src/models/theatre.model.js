const mongoose = require("mongoose");
const theatreschema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
});
module.exports = mongoose.model("theatre", theatreschema);

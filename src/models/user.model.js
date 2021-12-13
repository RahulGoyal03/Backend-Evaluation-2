const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo_url: { type: String, required: true },
    roles: { type: String, required: true },
  },
  {
    versionKey: false,
    timestaps: true,
  }
);

userschema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    return next();
  });
});
userschema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};

module.exports = mongoose.model("users1", userschema);

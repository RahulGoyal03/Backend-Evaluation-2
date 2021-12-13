const express = require("express");
const app = express();
const connect = require("../src/configs/db");
app.use(express.json());
const usercontroller = require("../src/controllers/auth.controller");
const moviecontroller = require("../src/controllers/movie.controller");
const theatrecontroller = require("../src/controllers/theatre.controller");
const screencontroller = require("../src/controllers/screen.controller");
const showcontroller = require("../src/controllers/show.controller");
const seatcontroller = require("../src/controllers/seat.controller");
app.use("/users", usercontroller);
// app.post("/login", login);
app.use("/movie", moviecontroller);
app.use("/t", theatrecontroller);
app.use("/s", screencontroller);
app.use("/shows", showcontroller);
app.use("/seats", seatcontroller);

app.listen(2225, async function () {
  await connect();
  console.log("listen to port 2225");
});

// static server
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const arr = require("./tas.json");
const axios = require("axios");
const configKeys = require("./config/keys");
const db = require("./db");
var catchThePirates = require("./catchThePirates");
var passport = require("passport");
var Strategy = require("passport-http-bearer").Strategy;

// bodyParser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection with mLab
mongoose
  .connect(configKeys.mongodbURI)
  .then(() => console.log("Successfully connection with mongoDB"))
  .catch(err => console.log(err));

passport.use(
  new Strategy(function(token, cb) {
    db.users.findByToken(token, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);
app.use(require("morgan")("combined"));

app.get("/pirates", (req, res) => {
  res.json(arr);
});

app.get(
  "/pirates/countPirates",
  passport.authenticate("bearer", { session: false }),
  function(req, res) {
    // requesing the piratesFaces from the given API
    request(
      "https://eila-pirate-api.herokuapp.com/pirates/prison",
      (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const data = JSON.parse(body);
          const pirateFaces = data.faces;
          const piratesFound = catchThePirates.catchThePirates(pirateFaces);
          res.json({ piratesFound: piratesFound });
        }
      }
    );
  }
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));

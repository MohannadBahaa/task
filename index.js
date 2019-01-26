// static server
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const configKeys = require("./config/keys");
const db = require("./db");
const catchThePirates = require("./catchThePirates");
const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;

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
  db.users.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
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
          const pirateInfo = JSON.parse(body);
          const pirateFaces = pirateInfo.faces;
          const piratesFound = catchThePirates.catchThePirates(pirateFaces);
          res.json({ piratesFound: piratesFound });
        }
      }
    );
  }
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));

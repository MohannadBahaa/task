// static server
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const app = express();
// to fetch Data from https://eila-pirate-api.herokuapp.com/pirates/prison
const axios = require("axios");
// cdn to connect with mlab
const configKeys = require("./config/keys");
// database config
const db = require("./db");
// requier passport and passport-http-bearer Strategy
const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;
// catchThePirates function count valid piratesFace
const catchThePirates = require("./catchThePirates");

// Connection with mLab
mongoose
  .connect(configKeys.mongodbURI)
  .then(() => console.log("Successfully connection with mongoDB"))
  .catch(err => console.log(err));
// use passport
passport.use(
  new Strategy((token, cb) => {
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

app.get("/pirates", (req, res) => {
  db.users.selectAll((err, data) => {
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
  (req, res) => {
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

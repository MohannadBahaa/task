// static server
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const arr = require("./tas.json");
const passport = require("passport");

// bodyParser MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongodbURI;

// Connection with mongo
mongoose
  .connect(db)
  .then(() => console.log("Successfully connection with mongoDB"))
  .catch(err => console.log(err));

app.use(passport.initialize());
// passport config
require("./config/passport")(passport);

app.get("/pirates", (req, res) => {
  res.json(arr);
});

var piratesFace = require("./config/keys").piratesFace;
app.get(
  "/pirates/countPirates",
  passport.authenticate("api-bearer", { session: false }),
  (req, res) => {
    var eyes = [";", "8"]; // must
    var nose = ["-", "~"]; // not have
    var mouth = [")", "|"]; // must
    // valid face count
    var count = 0;

    for (let i = 0; i < piratesFace.length; i++) {
      // split string to arr to divide face parts
      //Ex: currFace = ['8',')'];
      var currFace = piratesFace[i].split("");
      // to check the face have nose or not
      var size = currFace.length;
      // does'nt  have nose
      if (size === 2) {
        // check if valid face
        if (eyes.includes(currFace[0]) && mouth.includes(currFace[1])) {
          count++;
        }
      } else if (size === 3) {
        // have nose
        if (
          // check if valid face
          eyes.includes(currFace[0]) &&
          nose.includes(currFace[1]) &&
          mouth.includes(currFace[2])
        ) {
          count++;
        }
      }
    }
    // how much the piratesFace arr have valid face
    res.json({ piratesFound: count });
  }
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));

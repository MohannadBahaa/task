// static server
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const arr = require("./tas.json");

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

app.get("/pirates", (req, res) => {
  res.json(arr);
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// pirates Schema
var itemSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    isCaptured: Boolean
  },
  {
    collection: "eila"
  }
);

// creating pirates Schema model
var Item = mongoose.model("Item", itemSchema);

//  select all data from database
const selectAll = callback => {
  Item.find({}, { name: 1, age: 1, _id: 0, isCaptured: 1 }, (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

// token example thired Task
const data = [
  {
    id: 1,
    username: "jack sparrow",
    token: "123456789",
    displayName: "jack"
  },
  {
    id: 2,
    username: "johnny depp",
    token: "abcdefghi",
    displayName: "johnny"
  }
];
// find user by token
const findByToken = (token, cb) => {
  process.nextTick(() => {
    for (var i = 0, len = data.length; i < len; i++) {
      var record = data[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

// export all functions

module.exports = User = mongoose.model("user", itemSchema);
module.exports.selectAll = selectAll;
module.exports.findByToken = findByToken;

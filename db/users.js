var mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

// creating our model
var Item = mongoose.model("Item", itemSchema);

// Retrieving data from database
const selectAll = callback => {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

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

const findByToken = (token, cb) => {
  process.nextTick(function() {
    for (var i = 0, len = data.length; i < len; i++) {
      var record = data[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
module.exports = User = mongoose.model("user", itemSchema);
module.exports.selectAll = selectAll;
module.exports.findByToken = findByToken;

var data = [
  {
    id: 1,
    username: "jack sparrow",
    token: "123456789",
    displayName: "jack",
    emails: [{ value: "jack@example.com" }]
  },
  {
    id: 2,
    username: "johnny depp",
    token: "abcdefghi",
    displayName: "johnny",
    emails: [{ value: "johnny@example.com" }]
  }
];

exports.findByToken = (token, cb) => {
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

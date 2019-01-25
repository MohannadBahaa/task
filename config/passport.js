const passport = require("passport");
var CustomBearerStrategy = require("passport-http-custom-bearer");

module.exports = passport => {
  passport.use(
    "api-bearer",
    new CustomBearerStrategy(
      { headerName: "APIAuth", bodyName: "api_token", queryName: "api_token" },
      function(token, done) {
        User.findOne({ token: token }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user, { scope: "all" });
        });
      }
    )
  );
};

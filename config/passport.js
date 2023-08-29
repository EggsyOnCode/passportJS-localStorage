const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./database");
const { validPassword } = require("../lib/passwordUtils");

const verifyCallback = (username, password, cb) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return cb(null, false);
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if (isValid) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
    .catch((err) => {
      return cb(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

//done == cb (callback)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

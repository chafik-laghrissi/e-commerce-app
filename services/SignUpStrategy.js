const bcrypt = require("bcrypt");

const Strategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const _ = require("lodash");
const saltRounds = 10;
const SignUpStrategy = new Strategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    const email = _.toLower(req.body.email);
    User.findOne({ email: email }, (err, foundUser) => {
      if (err) return  done(err, null);
      else {
        if (foundUser) done("user all ready exist try to login", false);
        else {
          bcrypt.hash(password, saltRounds, function (error, hash) {
            if (error) return done(err, false);
            const newUser = new User({
              username: username,
              password: hash,
              email: email,
              lName: req.body.lName,
            });
            newUser.save();
            return done(null, newUser);
          });
        }
      }
    });
  }
);
module.exports = SignUpStrategy;

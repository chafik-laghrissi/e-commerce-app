const bcrypt = require("bcrypt");
const Strategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const _ = require("lodash");
const saltRounds = 10;
const SignInStrategy = new Strategy( { passReqToCallback: true},
  (req, username, password, done) => {
    const email = _.toLower(req.body.email);
    User.findOne({ email: email }, (err, foundUser) => {
      if (err) return done(err, null);
      else {
        if (foundUser) 
        {
            return done(null,foundUser);
          
        }
        else
        return done("Oops! not registered try to register and try again",false);
      }
    });
  });
module.exports = SignInStrategy;
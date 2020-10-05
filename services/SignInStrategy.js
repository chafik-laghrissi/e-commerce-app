const bcrypt = require("bcrypt");
const Strategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const _ = require("lodash");
const SignInStrategy = new Strategy( { passReqToCallback: true,usernameField:"email"},
  (req, email, password, done) => {
    const emailForm = _.toLower(email);
    User.findOne({ email: emailForm }, (err, foundUser) => {
      if (err) return done(err, null);
      else {
        if (foundUser) 
        {
          bcrypt.compare(password, foundUser.password,(error,match)=>{
            if(match)
            return done(null,foundUser);
            else
            return done (error,false);
          });
          
        }
        else
        return done("Oops! not registered try to register and try again",false);
      }
    });
  });
module.exports = SignInStrategy;
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy=require("passport-facebook");
const SignInStrategy = require("./SignInStrategy");
const SignUpStrategy = require("./SignUpStrategy");
const mongoose = require("mongoose");
const User = mongoose.model("User");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use("local-signup", SignUpStrategy);
passport.use("local-signin", SignInStrategy);
passport.use(
  new GoogleStrategy(
    {
      clientID: "385219539559-37m1rhkvo45qqlqccnstgc5o2uigq5ge.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ googleId: profile.id });
      if (foundUser) {
        // we already have a record with the given profile ID
        return done(null, foundUser);
      }
      // we don't have a user record with this ID, make a new record!
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        username: profile.name.givenName,
      });
      newUser.save((err, user) => {
        if (err) console.log(err);
        else return done(null, user);
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ facebookId: profile.id });
      console.log(profile);
      if (foundUser) {
        // we already have a record with the given profile ID
        return done(null, foundUser);
      }
      // we don't have a user record with this ID, make a new record!

      const newUser = new User({
        facebookId: profile.id,
        username: profile.displayName
      });
      newUser.save((err, user) => {
        if (err) console.log(err);
        else return done(null, user);
      });
    }
  )
);
const passport = require("passport");

const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/sign%20in" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.json("success");
    }
  );
  app;

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["user_friends", "email"] }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.json("success");
    }
  );
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/sign%20in" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.json("success");
    }
  );
  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      const { username, lName, email, _id,cart } = req.user;
      res.json({ username, lName, email, _id,cart, success: true });
    } else {
      res.json(null);
    }
  });

  app.post("/api/register", (req, res, next) => {
    passport.authenticate("local-signup", function (err, user, info) {
      if (user) {
        req.logIn(user, function (err, data) {
          if (err) console.log(err);
          else {const { username, lName, email, _id,cart } = user;
          const currentUser = { username, lName, email, _id,cart };
            res.json({ currentUser, success: true })};
        });
      } else {
        res.json({ error: err, success: false });
      }
    })(req, res, next);
  });



  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local-signin", function (error, user, info) {
      if (user) {
        req.logIn(user, function (err) {
          if (err) console.log(err);
          else {
            const { username, lName, email, _id } = user;
            const currentUser = { username, lName, email, _id };
            res.json({ success: true, currentUser });
          }
        });
      } else {
        res.json({
          message: "email or password wrong try again!",
          success: false,
        });
      }
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    try {
      req.logout();
      res.json({ message: "okay", currentUser: null, success: true });
    } catch (error) {
      res.json({ message: "log out error", error: error, success: false });
    }
  });
};

require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser=require("body-parser");
// var cookieParser = require('cookie-parser')

require('./models/User');
require('./services/passport');
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/e-commerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

// app.use(cookieParser())
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY,"me"]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("your server is running on port " + port);
});

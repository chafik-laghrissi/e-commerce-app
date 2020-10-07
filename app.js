require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
// var cookieParser = require('cookie-parser')
 const path=require("path");
const env=process.env.NODE_ENV || 'development';
require("./models/User");
require("./models/Item");
require("./models/Collection");
require("./models/Section");
require("./services/passport");
mongoose.set("useCreateIndex", true);

mongoose.connect(
  `mongodb+srv://chafik-laghrissi:${process.env.DB_PASSWORD}@cluster0.ea22q.mongodb.net/e-commerceDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const app = express();

// app.use(cookieParser())
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
  })
);
app.use(passport.initialize());
app.use(passport.session());



// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"client","build","index.html"));
// })
require("./routes/authRoutes")(app);
require("./routes/collectionRoutes")(app);
require("./routes/itemRoutes")(app);
require("./routes/sectionRoutes")(app);
require("./routes/cartRoutes")(app);
require("./routes/billingRoutes")(app);
console.log(env);
if (env=== "production") {
  app.use(express.static(__dirname + "/client/build"));
    app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  })
}
else
{
  app.use(express.static(__dirname + "/client/build"));
  app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client","build","index.html"));
})
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("your server is running on port " + port);
});

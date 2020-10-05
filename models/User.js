const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const itemSchema = require("./Item");
const userSchema = new mongoose.Schema({
  username: String,
  lName: String,
  email: String,
  password: String,
  googleId: String,
  facebookId:String,
  cart:[itemSchema]
});
userSchema.plugin(passportLocalMongoose);
mongoose.model("User", userSchema);

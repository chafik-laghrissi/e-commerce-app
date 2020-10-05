const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  imageUrl: String,
  price: Number,
  quantity:{type:Number,default:1}
});
mongoose.model("Item", itemSchema);
module.exports = itemSchema;

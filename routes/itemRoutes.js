const mongoose = require("mongoose");
const Item = mongoose.model("Item");
module.exports = (app) => {
  app.get("/api/item/:id", (req, res) => {
    const ItemId = req.params.id;
    try {
      Item.findOne({ _id: ItemId }, (err, foundItem) => {
        if (foundItem) res.json(foundItem);
        else res.status(404).json({ error: "Sorry item not found! " });
        if (err) throw err;
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  app.get("api/items", (req, res) => {
    try {
      Item.find((err, foundItems) => {
        if (foundItems) res.json(foundItems);
        else res.status(404).json({ error: "Sorry items not found! " });
        if (err) throw err;
      });
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

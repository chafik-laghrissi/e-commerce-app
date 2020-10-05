const mongoose = require("mongoose");
const Collection=mongoose.model("Collection");

module.exports=(app)=>{
app.get("/api/collection/:title",(req,res)=>{
 const collectionTitle= req.params.title;

 try {
    Collection.findOne({title:collectionTitle}, (err,foundCollection)=>{
        if(foundCollection)
      res.json(foundCollection);
        else
        res.status(404).json({error:"document not found."});
        if(err)
        throw err;
    });
 } catch (error) {
    res.status(500).json(error);
 }
 
});
app.get("/api/collections",(req,res)=>{
   try {
      Collection.find( (err,shopCollections)=>{
          if(shopCollections)
        res.json(shopCollections);
          else
          res.status(404).json({error:"document not found."});
          if(err)
          throw err;
      });
   } catch (error) {
      res.status(500).json(error);
   }
})
};
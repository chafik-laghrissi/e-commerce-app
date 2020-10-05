const mongoose=require("mongoose");
const Section=mongoose.model("Section");
module.exports=(app)=>{
app.get("/api/section",(req,res)=>{
 const sectionTitle= req.body.title;
  try {
     Section.findOne({title:sectionTitle},(err,foundSection)=>{
     if(foundSection)
     res.json(foundSection);
     else res.status(404).json({ error: "Sorry section not found!" });
     if(err) throw err;
     })
 } catch (error) {
    res.status(500).json(error);
 }
});
app.get("/api/sections",(req,res)=>{
   try {
      Section.find((err,foundSections)=>{
      if(foundSections)
      res.json(foundSections);
      else res.status(404).json({ error: "Sorry sections not found!" });
      if(err) throw err;
      })
  } catch (error) {
     res.status(500).json(error);
  }
})
};
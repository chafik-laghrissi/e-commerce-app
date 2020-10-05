const mongoose =require("mongoose");
const User=mongoose.model("User");

module.exports=(app)=>{
app.put("/api/user/updateCart",async (req,res)=>{
if(req.user)
{
   try {
    await User.update({_id:req.user._id},{cart:req.cart},{overwrite:true},(err)=>{
        if(err) throw err;
        else
        {
            res.json({success:true,message:"Cart updated successfully."})
        }
    });
   } catch (error) {
    res.status(500).json({success:false,message:"Oops something went wrong!",error})
   }
}
else
res.status(401).json({success:false,message:"user not authorized error!"})
})
}
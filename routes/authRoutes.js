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

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    if(req.user)
    {
      const {username,lName,email,_id}=req.user
    res.json({username,lName,email,_id});
    }
    else
    {
      res.json();
    }
  });


  app.post("/api/register",(req,res,next)=>{
    
    passport.authenticate("local-signup",function(err,user,info){
      console.log(user);
      if(user)
      {
        req.logIn(user,function(err,data){
          if(err)
          console.log(err);
          else
          res.json(data);
        } )
      }
      else
      {
        res.json({message:err});
      }
    })(req,res,next);
    
  } );


app.get("/failure",(req,res)=>{
  res.send("failed to register");
})

app.post("/api/login",(req,res,next)=>{
  
  passport.authenticate("local-signin",function(err,user,info){

    if(user)
    {
      req.logIn(user,function(error){
        if(err)
        console.log(error) 
    });}
    else
    {
      res.json({message:"oops something went wrong! "});
    }
  })(req,res,next);
  console.log(req.user);
} );




  app.get("/api/logout", (req, res) => {
    req.logout();
    console.log("log out user");
    res.send(req.user);
  });
};

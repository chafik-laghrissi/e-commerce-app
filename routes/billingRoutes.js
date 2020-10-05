const stripe = require("stripe")(process.env.STRIP__SECRET_KEY);
module.exports = (app) => {
  app.post("/api/stripe", async(req, res) => {
    const { token, amount } = req.body;
    const charge=await stripe.charges.create({
      amount: amount,
      currency: "usd",
      description: "clothing payment for cart items",
      source: token.id,
    });
    console.log(charge);
    res.redirect("/api/current_user");
  });
};

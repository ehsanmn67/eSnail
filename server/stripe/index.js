'use strict';

/* Declate dependencies */
var express = require('express'),
	router = express.Router();


/* Handle user request */
router.post('/', function (req, res) {
	// Set your secret key: remember to change this to your live secret key in production
	// See your keys here https://dashboard.stripe.com/account/apikeys
	var stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

	// (Assuming you're using express - expressjs.com)
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;

	var charge = stripe.charges.create({
	  amount: 349, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Send a Domestic Letter"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	  }
	});
});

module.exports = router;
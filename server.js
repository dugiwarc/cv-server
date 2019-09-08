require("dotenv").config();

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.use(cors());

app.listen(port, error => {
	if (error) throw error;
	console.log("Server running on port " + port);
});

app.post("/save-stripe-token", (req, res) => {
	console.log("ACCESS");
	const body = {
		source: req.body.id,
		amount: req.body.amount,
		currency: req.body.currency
	};

	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes });
		}
	});
});

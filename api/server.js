// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { EMAIL_ACCESS_KEY } = require("../config/config.json");

const PORT = process.env.PORT || 3001;

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

var jsonParser = bodyParser.json();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/verify", jsonParser, (req, res) => {
	const email = req.body.email;
	axios.get("http://apilayer.net/api/check?access_key=" + EMAIL_ACCESS_KEY + "&email=" + email)
		.then((response) => {
			if(response.data.format_valid)
				return res.status(200).send({"message":"Success!"});
			else
				return res.status(404).send({"message":"Email is invalid!"});
		})
		.catch((err) => {
			return res.status(400).send({"message":"Error found when attempting verification! " + err});
		});
	return null;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
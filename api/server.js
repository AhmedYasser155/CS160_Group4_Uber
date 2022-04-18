// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { EMAIL_ACCESS_KEY } = require("../config/config.json");
import dbConnect from "../utils/dbConnect";
import User from "../models/user";

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

app.post("/addUser", jsonParser, async (req, res) => {
	await dbConnect();
	await User.create(req.body.user)
		.then((response) => {
			return res.status(200).send({"message":"Success!"});
		})
		.catch((err) => {
			return res.status(400).send({"message":"Error when adding user to database!"});
		});
	return null;
});

app.post("/getUser", jsonParser, async (req, res) => {
	await dbConnect();
	await User.findOne(req.body.id)
		.then((response) => {
			return res.status(200).send(response);
		})
		.catch((err) => {
			return res.status(400).send({"message":"Error when finding user in database!"});
		});
	return null;
});

app.post("/updateUser", jsonParser, async (req, res) => {
	await dbConnect();
	await User.findByIdAndUpdate(req.body.data.id, req.body.data, {
			new: true,
			runValidators: true,
		})
		.then((response) => {
			return res.status(200).send({"message":"Success!"});
		})
		.catch((err) => {
			return res.status(400).send({"message":"Error when updating user to database!"});
		});
	return null;
});

app.post("/deleteUser", jsonParser, async (req, res) => {
	await dbConnect();
	await User.deleteOne({
			_id: req.body.id,
	  	})
		.then((response) => {
			return res.status(200).send({"message":"Success!"});
		})
		.catch((err) => {
			return res.status(400).send({"message":"Error when deleting user in database!"});
		});
	return null;
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
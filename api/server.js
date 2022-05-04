// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { EMAIL_ACCESS_KEY, db_url } = require("../config/config.json");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;   

var dbo;


// Connects server to monogdb database
MongoClient.connect(db_url, function(err, db) {
  if(err) 
  {
	  throw err
  }
    dbo = db.db("myFirstDatabase");
});


const PORT = process.env.PORT || 3001;

const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200
}

app.use(cors(corsOptions)) // Use this after the variable declaration

var jsonParser = bodyParser.json();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/verify", jsonParser, (req, res) => {
	const email = req.body.email;
	axios.get("http://apilayer.net/api/check?access_key=" + EMAIL_ACCESS_KEY + "&email=" + email + "&smtp=1&format=1")
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


app.post("/user/id", jsonParser, async (req, res) => { 


	const user=await dbo.collection("users").findOne({_id: new ObjectId(req.body.id)})
		.then((response) =>{
		res.status(200).send(response)
	})
	.catch((err) => {
		res.status(400).send({"message":err.errmsg})
	 })

});

//add user
app.post("/user/addUser", jsonParser, async (req, res) => { 
	dbo.collection("users").createIndex( { "phone": 1 }, { "unique": true, "sparse":true } )
	dbo.collection("users").createIndex( { "license": 1 }, { "unique": true, "sparse":true  } )
	dbo.collection("users").createIndex( { "email": 1 }, { "unique": true, "sparse":true  } )

	await dbo.collection("users").insertOne( req.body.user)
		.then(result =>{
			res.status(200).send({"id":result.insertedId})
		})
		.catch((err) => {
			res.status(400).send({"message":err.errmsg})
		})
});

// add ride
app.post("/ride/addRide", jsonParser, async (req, res) => {
	const newRide = await dbo.collection("rides").insertOne(req.body.data)
	.then(result => {
		res.status(200).send({id:result.insertedId})
	})
	.catch((err) => {
		res.status(400).send({err:err.errmsg})
	})
})

// add ride
app.post("/ride/addRide", jsonParser, async (req, res) => {
	const newRide = await dbo.collection("rides").insertOne(req.body.data)
	.then(result => {
		res.status(200).send({id:result.insertedId})
	})
	.catch((err) => {
		res.status(400).send({err:err.errmsg})
	})
})

//authenticate user 
app.post("/auth", jsonParser, async(req,res)=> {
	const user = await dbo.collection("users").findOne({ email: req.body.userEmail });
	if (user) {
		// check user password with hashed password stored in the database
		const validPassword = await bcrypt.compare(req.body.userPassword, user.password)
		if (validPassword) {
			res.status(200).send({
				"id": user._id,
				"userType": user.userType
			})
		} else {
		  res.status(400).send({ "message": "Invalid Password" });
		}
	}
	 else {
		res.status(401).send({ "message": "User does not exist" });
	  }
	})


app.post("/user/updateUser", jsonParser, async (req, res) => {
	await dbo.collection("users").findByIdAndUpdate({
		_id: req.body.id
		},
		req.body.data, 
		{
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


app.post("/user/deleteUser", jsonParser, async (req, res) => {
	await dbo.collection("users").deleteOne({
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
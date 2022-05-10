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

this.state = {
	dict: {},
	socketMap: {}
};


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

const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

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

// get ride
app.post("/ride/id", jsonParser, async (req, res) => {
	const ride = await dbo.collection("rides").findOne({_id: new ObjectId(req.body.id)})
	.then((response) => {
		res.status(200).send(response)
	})
	.catch((err) => {
		res.status(400).send({"message": err.errmsg})
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
	await dbo.collection("users").updateOne({
		_id: req.body.id
		},
		{
			$set:req.body.data
		})
		.then((response) => {
			return res.status(200).send({"message":response});
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

// LOL IN THE WORKS
function findBestDriver(start, drivers) {
	if(Object.keys(drivers).length === 0) {
		console.log("dict is empty!");
		const bestDriver = {
			firstName:"temp",
			lastName:"driver",
			email:"tempdriver@yahoo.com",
			phone:1234567890,
			license: 1234567890,
			password:"verysecurepassword",
			onlineStatus:true,
			rideid:"N/A",
			driverLocation:"123 Kenward Street, San Jose, California",
			userType:1,
			car:{
				carModel:"Camry",
				carMake: "Toyota",
				licensePlate:"1a2b3c4" 
			}
		}
		return bestDriver;
	}
	else {
		console.log("There are drivers!");
		return Object.values(drivers)[0];
	}
}

io.on('connection', (socket) => {
	console.log('a user connected ' + socket.id);

	socket.on('add-driver', (passed) => {
		console.log("ADDED: " + socket.id + " " + passed.id);
		this.state.dict[passed.id] = passed.data;
		this.state.socketMap[socket.id] = passed.id;
		console.log(this.state.dict);
	});

	socket.on('find-best-driver', (start) => {
		var driver = findBestDriver(start, this.state.dict);
		io.sockets.emit('receive-best-driver', driver);
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
		for(var key in this.state.socketMap) {
			if(key == socket.id) {
				var id = this.state.socketMap[key];
				delete this.state.socketMap[key];
				delete this.state.dict[id];
			}
		}
	});
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
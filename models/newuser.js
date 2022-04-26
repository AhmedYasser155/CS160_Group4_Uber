const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({

    color:{
        type:String
    },
    make:{
        type:String
    },
    model:{
        type:String
    },
    license:{
        type:String,
        index: {unique:true}
        
    },

})
const RideSchema = new mongoose.Schema({
    pickup:{
        type:String
    },
    dropoff:{
        type:String
    },
    distance: {
        type:Number
    },
    time:{ 
        type:Number
    },
    cost:
    {
        type:Number
    }

},{
    timestamps: true
})

const DriverSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String, 
        index: {unique:true}
    },
    phone:{
        type:Number,
        index: {unique:true}
        
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },
    onlineStatus:
    {
        type:Number
    },
    currentLocation:{
        type:String
    },
    ride: [RideSchema],
    car:[CarSchema]
},{
    timestamps: true
})

const RiderSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String, 
        index: {unique:true}
    },
    phone:{
        type:Number,
        index: {unique:true}
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },
    onlineStatus:
    {
        type:Number
    },
    accountBalance:
    {
        type:Number
    },   
     ride: [RideSchema]
},{
    timestamps: true
})

module.exports =  mongoose.models.matchingtest || mongoose.model("matchingtest",RiderSchema)|| mongoose.model("matchingtest", DriverSchema)

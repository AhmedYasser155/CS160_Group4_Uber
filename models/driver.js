const mongoose = require('mongoose');


const DriverSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    //Email is unique
    email:{
        type:String, 
        index: {unique:true}
    },
    //Phone number is unique
    phone:{
        type:Number,
        index: {unique:true}
        
    },
    //License is unique
    license:{
        type:String,
        index: {unique:true}
        
    },
    //Password is hashed before stored in the database
    password:{
        type:String
    },
    // 0(Rider) or 1(Driver) 
    userType:{
        type:Number
    },
    // String representation of rideID
    rideid: {
        type:String
    },
    // Looking for rides
    onlineStatus:{
        type:Boolean
    },
    //String representation of driver location coordinates
    driverLocation:{
        type:String
    },
    //Array with two fields 
    car:
    {
        // For now only one car per driver
        carModel:{
            type:String
        },
        carMake:{
            type:String
        },
        licensePlate:{
            type:String
        }
    }


},{
    timestamps: true
})

module.exports =  mongoose.models.newtest || mongoose.model("newtest", DriverSchema)

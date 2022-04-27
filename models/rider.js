const mongoose = require('mongoose');



const RiderSchema = new mongoose.Schema({
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
    //Password is hashed before stored in database
    password:{
        type:String
    },
    // 0(Rider) or 1(Driver) 
    userType:{
        type:Number
    },
    //String representation of driver location coordinates
    rideid: {
        type:String
    },
    accountBalance:{
        type:Number
    }
},{
    timestamps: true
})

module.exports =  mongoose.models.user || mongoose.model("user", RiderSchema)
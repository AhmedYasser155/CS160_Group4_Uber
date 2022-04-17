import mongoose from "mongoose"

const RideSchema = new mongoose.Schema({
    pickup:{
        type:String
    },
    dropoff:{
        type:String
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
    license:{
        type:String,
        index: {unique:true}
        
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },
    ride: [RideSchema]
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
    ride: [RideSchema]
},{
    timestamps: true
})

export default mongoose.models.usertest ||mongoose.model("usertest",RiderSchema)|| mongoose.model("usertest", DriverSchema)

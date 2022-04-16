import mongoose from "mongoose"

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
    ride: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Ride'
        }
    ]
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
    ride: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Ride'
        }
    ]
},{
    timestamps: true
})

export default mongoose.models.usertest ||mongoose.model("usertest",RiderSchema)|| mongoose.model("usertest", DriverSchema)

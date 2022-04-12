import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String, 
        unique: true,
    },
    phone:{
        type:Number,
        unique: true,
        
    },
    license:{
        type:String,
        unique: true,
        
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },
});

const RiderSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String, 
        unique: true,
    },
    phone:{
        type:Number,
        unique: true,
        
    },
    password:{
        type:String
    },
    userType:{
        type:Number
    },
});

export default mongoose.models.usertest || mongoose.model("usertest", UserSchema)||mongoose.model("usertest", RiderSchema);



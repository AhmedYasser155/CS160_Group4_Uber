import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNumber:String,
    driver: Boolean,
    createdAt:{
        type:Date,
        default: new Date()
    }
})

module.exports = mongoose.models.User || mongoose.model('User', signUpSchema);
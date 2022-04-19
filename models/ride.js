const mongoose  = require('mongoose');
const RideSchema = new mongoose.Schema({
    dropoff:{
        type:String,
    },
    pickup :{
        type: String
    }
},{
    timestamps:true
})

module.exports = mongoose.models.usertest ||mongoose.model("usertest", RideSchema)

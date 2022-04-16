const mongoose  = require('mongoose');
const RideSchema = new mongoose.Schema({
    dropoff:{
        type:String,
        required: '{PATH} is required!'
    },
    pickup :{
        type: String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Ride',RideSchema);

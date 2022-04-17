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

export default mongoose.models.usertest ||mongoose.model("usertest", RideSchema)

const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    pickup:{
        type:String
    },
    dropoff:{
        type:[String]
    },
    driver:{
        //cant cross reference between collections 
        //work around reference id in string form
        type:String
    },
    rider:{
        //cant cross reference between collections 
        //work around reference id in string form
        type:String
    },
    distance:{
        type:String
    },
    totalTime:{
        type:String
    },
    cost:{
        type:String
    }

},{
    timestamps: true
})



module.exports =  mongoose.models.ride || mongoose.model("ride",RideSchema)

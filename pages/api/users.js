
const mongoose = require('mongoose');
const {User} = require('../../models/model')

mongoose.connect('mongodb+srv://cs160:sjsucs160@cluster0.arpcf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{  
   useNewUrlParser: true,  
   useUnifiedTopology: true
});

const user4Data = [{
    id: 4,
    name: "Andrew",
    type: "rider"
}]

User.insertMany(user4Data)
    .then(value => {
        console.log("Saved Successfully");
    })
    .catch(error => {
        console.log(error);
    })
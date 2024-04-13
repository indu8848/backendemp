const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:String,
    location:String,
    position:String


})


const dataModel = mongoose.model('employees',schema)
module.exports=dataModel;
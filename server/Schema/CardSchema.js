const mongoose = require('mongoose')

const cardDetails = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    cardnumber:{
        type:String,
        required:true,
    },
    expiry:{
        type:String,
        required :true,
    },
    cvv:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model("card" , cardDetails)
const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('trackerappincome', incomeSchema);

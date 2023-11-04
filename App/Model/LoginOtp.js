const mongoose = require("mongoose");

const loginOtpSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('trackappotp', loginOtpSchema);
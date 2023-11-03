const express = require("express");
const User = require("../Model/User");


const findUserByEmail = async(email)=>{
    const user = User.findOne({email : email});
    if(!user){
        throw new error;
        return ('User not found');
    }else{
        return user;
    }

  

}

module.exports = {findUserByEmail}
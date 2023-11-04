const express = require("express");
const User = require("../Model/User");


const findUserByEmail = async(email)=>{
    const user = User.findOne({email : email});
    return user;
}

const findUserById = async(id) => {
    const user = User.findById(id);
    return user;
}



module.exports = {findUserByEmail,findUserById}
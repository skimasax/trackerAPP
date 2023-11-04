const express = require("express");
const User = require("../Model/User");
const UserService = require("../Service/UserService");



const getProfile = async(req,res)=> {
    const loggedInUser = req.user;

    //find for the user via their id
    const user = await UserService.findUserById(loggedInUser._id);
    if(!user)
    {
        return res.status(404).json({
            'status':false,
            'message':"User not found"
        });
    }

   return res.status(200).json({
        'status':true,
        'data':user
    });
}

module.exports = {getProfile}
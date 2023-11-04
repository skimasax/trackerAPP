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

const updateProfile = async(req,res) => {
    const {firstname,lastname,country} = req.body;
    const loggedInUser = req.user;

    //get the user details
    const user = await UserService.findUserById(loggedInUser._id);

    user.firstname = firstname,
    user.lastname = lastname,
    user.country = country

    await user.save();

    return res.status(200).json({
        'status':true,
        'message':'Profile Updated Successfully'
    });

}

module.exports = {getProfile,updateProfile}
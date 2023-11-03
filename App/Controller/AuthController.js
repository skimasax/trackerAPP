const express = require("express");
const user = require("../Model/User");
const bcrypt = require("bcryptjs");
const UserService = require("../Service/UserService");


const register = async(req,res) =>{
    const {firstname, lastname, email, gender, password,confirm_password,country} = req.body;

    //check that all fields are completed
    if(!firstname || !lastname || !email || !gender || !password || !country || !confirm_password)
    {
        res.status(422).json({
            status:false,
            'message':"Please complete the fields"
        })
    }

    //check the password
    if(password != confirm_password)
    {
        res.status(422).json({
            status:false,
            'message':"Password do not match"
        })
    }

    //check if email exists before
    const existinguser = await UserService.findUserByEmail(email);
    if(existinguser)
    {
        res.status(422).json({
            status:false,
            'message':"Email already exist"
        })
    }
    
        //hash the paswword
        hashedPassword = await bcrypt.hash(password, 10);

        const data = await user.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            country: country,
            password: hashedPassword

        })

        res.status(201).json({
            status:true,
            data: data,
            'message':"Signup successfully"
        })

}


module.exports = {register};
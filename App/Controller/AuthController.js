const express = require("express");
const User = require("../Model/User");
const LoginOtp = require("../Model/LoginOtp");
const bcrypt = require("bcryptjs");
const UserService = require("../Service/UserService");
const cryptoToken = require("../Config/Token");
const transporter = require("../Service/EmailService");


const register = async(req,res) =>{
    const {firstname, lastname, email, gender, password,confirm_password,country} = req.body;

    try {
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
    const user = await UserService.findUserByEmail(email);
    if(user)
    {
        res.status(422).json({
            status:false,
            'message':"Email already exist"
        })
    }
    
        //hash the paswword
        hashedPassword = await bcrypt.hash(password, 10);

        const data = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            country: country,
            password: hashedPassword

        })

        //generate radom 4 numbers as token
        const otp = await cryptoToken.generateRandomNumber();
        const message = `Dear ${firstname}, kindly verify your trackerApp account with this token ${otp}`;

        //save into Otp Table
        await LoginOtp.create({
            user_id:data._id,
            otp:otp
        })

        //send email to the user
   const mailOptions = {
    from: 'bimbo@gmail.com',
    to: email,
    subject: 'TrackerApp Email Verification',
    text: message,
  };
  
  const mail = await transporter.sendMail(mailOptions);
 
  data.password=undefined;

        res.status(201).json({
            status:true,
            data: data,
            'message':"Signup successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'status':false,
            'message':"Error while trying to signup"
        })
    }

    

}

const login = async(req, res) =>{
    const {email, password} = req.body;

    try {
        //search if the email exist
        const user = await User.findOne({email:email}).select("+password");
        if(!user)
        {
            res.status(404).json({
                'status':false,
                'message':"User not found"
            });
        }

        //verify the password
        const passwordCheck = await bcrypt.compare(password,user.password);

        if(!passwordCheck)
        {
            res.status(422).json({
                'status':false,
                'message':"Password do not match"
            });
        }

        if(user.verified_at == NULL)
        {
            res.status(422).json({
                'status':false,
                'message':"Please verify your account"
            });
        }

        //create token
        const token = await cryptoToken.generateAccessToken(user._id);

        user.password=undefined;

        res.status(200).json({
            'status':true,
            'data':user,token,
            'message':"Login successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'status':false,
            'message':"Error while trying to signup"
        })
    }
}


module.exports = {register,login};
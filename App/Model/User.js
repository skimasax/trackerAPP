const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstname:{
        type : String,
        required: true
   },
   lastname:{
    type : String,
    required: true
    },
    email:{
        type : String,
        required: true,
        unique: true
   },
   gender: {
    type: String,
    required: [true, 'Please add your gender']
    },
    password: {
    type: String,
    required: [true, 'Please add your password'],
    select:false
    },
    country: {
    type: String,
    required: [true, 'Please add your country']
    },
    verified_at: {
        type: String,
        required: false,
        default:null,
        },
},{
    timestamps: true
})

module.exports = mongoose.model('trackappusers', userSchema);
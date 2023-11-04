const express = require("express");
const env = require("dotenv").config();
const mongoose = require("../App/Config/Database");
const cryptoToken = require("../App/Config/Token");
const token = cryptoToken.generateRandomToken(32);
const nodemailer = require('nodemailer');



const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const authRoute = require("./Route/AuthRoute");
const profileRoute = require("./Route/UserRoute");


//create your routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
  });
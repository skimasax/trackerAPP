const express = require("express");
const env = require("dotenv").config();
const mongoose = require("../App/Config/Database");
const cryptoToken = require("../App/Config/Token");
const token = cryptoToken.generateRandomToken(32);
const nodemailer = require('nodemailer');
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));
app.use(express.urlencoded({ extended: false }));


const authRoute = require("./Route/AuthRoute");
const profileRoute = require("./Route/UserRoute");
const incomeRoute = require("./Route/IncomeRoute");
const expensesRoute = require("./Route/ExpensesRouter")


//create your routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expenses", expensesRoute);


app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
  });
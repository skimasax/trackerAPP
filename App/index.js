const express = require("express");
const env = require("dotenv").config();
const mongoose = require("../App/Config/Database");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const authRoute = require("./Route/AuthRoute");


//create your routes
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
  });
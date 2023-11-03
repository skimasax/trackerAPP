const express = require("express");
const env = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
  });
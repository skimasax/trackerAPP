const express = require("express");
const authenticatetoken = require("../Middleware/Auth");
const router = express.Router();
const {recordIncome} = require("../Controller/IncomeController");


router.use(authenticatetoken);
router.post('/record-income',recordIncome);


module.exports = router;

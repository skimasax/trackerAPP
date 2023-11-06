const express = require("express");
const authenticatetoken = require("../Middleware/Auth");
const router = express.Router();
const {recordIncome,deleteIncome, getIncome} = require("../Controller/IncomeController");


router.use(authenticatetoken);
router.post('/record-income',recordIncome);
router.get('/get-income',getIncome);
router.delete('/delete-income/:id',deleteIncome);


module.exports = router;

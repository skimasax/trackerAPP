const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middleware/Auth");

const {recordExpenses,totalExpenses} = require("../Controller/ExpensesController");

router.use(authenticateToken);

router.post('/record-expenses',recordExpenses);
router.get('/total-expenses',totalExpenses);


module.exports = router;
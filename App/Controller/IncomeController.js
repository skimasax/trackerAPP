const income = require("../Model/Income");
const incomeService = require("../Service/IncomeService");


const recordIncome = async(req,res) =>{
    const user = req.user;
    const {amount,details} = req.body;

    if(!amount || !details)
    {
       return res.status(422).json({
            'status':false,
            'message':'Please complete the fields'
        })
    }

try {
        //save into income DB
const incomeService = require("../Service/IncomeService");
const newIncome = await incomeService.recordAllIncome(user._id,amount,details);
    return res.status(201).json({
        'status':true,
        'message':'Inflow added successfully'
    });
} catch (error) {
    console.log(error);
  return res.status(500).json({
        'status':false,
        'message':'Error Occured'
    });
}









}

module.exports = {recordIncome}
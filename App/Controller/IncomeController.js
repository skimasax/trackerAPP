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

const deleteIncome = async(req,res) => {
    const user = req.user;
    const Id = req.params.id;

    //find the income
    const existingIncome = await income.findOne({_id:Id});
 
    if(!existingIncome)
    {
        return res.status(404).json({
            'status':true,
            'message':'Income does not exist'
        });
    }

    await income.findByIdAndDelete(Id);

    return res.status(200).json({
        'status':true,
        'message':'Income deleted successfully'
    });


}

const getIncome = async(req,res)=> {
    const user = req.user;

    const incomes = await income
    .find({user_id: user._id})
    .sort({createdAt: -1});


    if(incomes.length < 0)
    {
        return res.status(404).json({
            'status':false,
            'data':[]
        })
    }

    return res.status(200).json({
        'status':false,
        'data':incomes
    })

}

module.exports = {recordIncome,deleteIncome, getIncome}
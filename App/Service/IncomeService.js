const income = require("../Model/Income");


const recordAllIncome = async(userId,amount,details) =>{
        const newIncome = income.create({
            user_id:userId,
            amount,
            details
        });

        (await newIncome).save();

        return newIncome;
}

module.exports = {recordAllIncome};
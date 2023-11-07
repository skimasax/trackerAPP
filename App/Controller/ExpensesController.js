const expensesModel = require("../Model/Expenses");

const recordExpenses = async(req,res)=>{
    const{amount,details}= req.body;
    const user = req.user;

    if(!amount || !details)
    {
        return res.status(422).json({
            'status':false,
            'message':'Complete the fields'
        });
    }

   await expensesModel.create({
        user_id:user._id,
        amount,
        details
   });

   return res.status(201).json({
    'status':true,
    'message':'Expenses added successfully'
});
}

const totalExpenses = async (req, res) => {
    try {
        const user = req.user;


        const expenses = await expensesModel.aggregate([
            {
                $match: {
                    user_id: user._id
                }
            },
            {
                $group: {
                    _id: null,  // Use null to group all results together
                    totalAmount: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        console.log(expenses);

        const total = expenses.length > 0 ? expenses[0].totalAmount : 0;

        return res.status(200).json({ 
            status: true,
            total_amount: total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



module.exports={recordExpenses,totalExpenses}
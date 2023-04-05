const express = require('express')
const router=express.Router()
const User=require('../models/User')
const WalletTxn=require('../models/WalletTxn')
const GoldTxn = require('../models/GoldTxn')
router.post("/createuser",async(req,res)=>{
    try {
        const { firstName, lastName, password, mobileNumber, country, email, runningBalance } = req.body;
        const user = await User.create({
          firstName,
          lastName,
          password,
          mobileNumber,
          country,
          email,
          runningBalance
        });
        res.status(201).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }

})


router.post("/wallettxn",async(req,res)=>{
    try {
        const { userId, amount, type, status, runningBalance, transaction } = req.body;

        const walletTxn = await WalletTxn.create({
          userId,
          amount,
          type,
          status,
          runningBalance,
          transaction,
          createdAt: new Date(),
          updatedAt : new Date()
        });
        res.status(201).json({ message: 'Wallet transaction created successfully', walletTxn });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
})




router.post("/goldtxn",async(req,res)=>{
  try {
    const { userId, entityUser, quantity, amount, type, status, runningBalance } = req.body;

    const goldTxn = new GoldTxn({
      userId,
      entityUser,
      quantity,
      amount,
      type,
      status,
      runningBalance
    });

    await goldTxn.save();

    res.status(201).json({
      success: true,
      message: 'Gold transaction created successfully',
      data: goldTxn
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.get('/portfolio', async (req, res) => {
  try {
    const userId = req.body.user_id;
    const walletTxns = await WalletTxn.find({ userId });
    const goldTxns = await GoldTxn.find({ userId });

    const user = await User.findById(userId);
    const currentFunds = user.runningBalance.wallet;
    const currentGoldQty = user.runningBalance.gold;
    const currentGoldPrice = user.runningBalance.goldPrice;

    const netFundAdded = walletTxns.reduce((total, txn) => {
      if (txn.type === 'CREDIT') {
        return total + txn.amount;
      } else {
        return total - txn.amount;
      }
    }, 0);

    const netGoldSpent = goldTxns.reduce((total, txn) => {
      if (txn.type === 'CREDIT') {
        return total - txn.amount;
      } else {
        return total + txn.amount;
      }
    }, 0);

    const totalGoldValue = currentGoldQty * currentGoldPrice;

    const netGrowthOrLoss = currentFunds + netFundAdded + netGoldSpent - totalGoldValue;

    const gainOrLossPercentage = ((netGrowthOrLoss / currentFunds) * 100).toFixed(2);

    res.json({
      netFundAdded,
      currentFund: currentFunds,
      netGrowthOrLoss,
      gainOrLossPercentage: `${gainOrLossPercentage}%`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports =router;


const mongoose=require("mongoose");
const Goldschema=new mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    entityUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['CREDIT', 'DEBIT'],
      required: true
    },
    status: {
      type: String,
      enum: ['FAILED', 'SUCCESS', 'WAITING', 'CANCELED', 'PENDING'],
      required: true
    },
    runningBalance: {
      wallet: {
        type: Number,
        required: true
      },
      loyaltyPoints: {
        type: Number,
        required: true
      },
      goldBalances: {
        type: Number,
        required: true
      }
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now
    }

})
    
module.exports =mongoose.model('Gold',Goldschema)
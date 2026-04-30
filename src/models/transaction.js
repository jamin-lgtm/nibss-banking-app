const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["DEPOSIT", "WITHDRAWAL", "TRANSFER"],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },

  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },

  reference: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
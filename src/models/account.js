const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },

  accountNumber: {
    type: String,
    unique: true
  },

  balance: {
    type: Number,
    default: 15000   // 👈 onboarding bonus
  },

  currency: {
    type: String,
    default: "NGN"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Account", accountSchema);
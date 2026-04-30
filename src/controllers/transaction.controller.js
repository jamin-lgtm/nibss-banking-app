const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// GENERATE REFERENCE
const generateRef = () => {
  return "TXN-" + Date.now();
};

// TRANSFER MONEY
exports.transferMoney = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    const sender = await Account.findById(fromAccountId);
    const receiver = await Account.findById(toAccountId);

    // check accounts
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found" });
    }

    // check balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // debit sender
    sender.balance -= amount;

    // credit receiver
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // save transaction
    const transaction = await Transaction.create({
      type: "TRANSFER",
      amount,
      fromAccount: sender._id,
      toAccount: receiver._id,
      reference: generateRef()
    });

    res.json({
      message: "Transfer successful",
      transaction
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BALANCE
exports.getBalance = async (req, res) => {
  try {
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      accountNumber: account.accountNumber,
      balance: account.balance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const accountId = req.params.accountId;

    const transactions = await Transaction.find({
      $or: [
        { fromAccount: accountId },
        { toAccount: accountId }
      ]
    })
    .populate("fromAccount")
    .populate("toAccount")
    .sort({ createdAt: -1 });

    res.json({
      count: transactions.length,
      transactions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
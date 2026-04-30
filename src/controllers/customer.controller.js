const Customer = require("../models/Customer");
const Account = require("../models/Account");

// simple account generator
const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// mock verification (BVN/NIN simulation)
const verifyIdentity = (bvn, nin) => {
  if (!bvn && !nin) return false;
  return true; // later replace with NIBSS API
};

// ONBOARD CUSTOMER
exports.onboardCustomer = async (req, res) => {
  try {
    const { fullName, email, phone, bvn, nin } = req.body;

    // 1. verify identity
    const isValid = verifyIdentity(bvn, nin);

    if (!isValid) {
      return res.status(400).json({
        message: "BVN or NIN verification failed"
      });
    }

    // 2. create customer
    const customer = await Customer.create({
      fullName,
      email,
      phone,
      bvn,
      nin,
      isVerified: true
    });

    // 3. create account
    const account = await Account.create({
      customer: customer._id,
      accountNumber: generateAccountNumber(),
      balance: 15000
    });

    res.status(201).json({
      message: "Customer onboarded successfully",
      customer,
      account
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
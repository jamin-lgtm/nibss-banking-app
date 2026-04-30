const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction.controller");
const auth = require("../middlewares/auth.middleware");

// 🔐 PROTECTED ROUTES

router.post("/transfer", auth, transactionController.transferMoney);

router.get("/balance/:accountId", auth, transactionController.getBalance);

router.get("/history/:accountId", auth, transactionController.getHistory);

module.exports = router;
const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");

// onboard customer
router.post("/onboard", customerController.onboardCustomer);

module.exports = router;
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

// LOGIN (simple version for assignment)
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
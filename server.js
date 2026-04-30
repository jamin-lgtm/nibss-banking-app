require("dotenv").config();
const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const connectDB = require("./src/config/db");

const app = express();

// 1. SECURITY MIDDLEWARES (GLOBAL)
app.use(helmet());
app.use(cors());

// 2. RATE LIMITING (GLOBAL)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests
});

app.use(limiter);

// 3. BODY PARSER
app.use(express.json());

// 4. DATABASE
connectDB();

// 5. ROUTES
app.use("/customers", require("./src/routes/customer.routes"));
app.use("/transactions", require("./src/routes/transaction.routes"));

// 6. TEST ROUTE
app.get("/", (req, res) => {
  res.send("NIBSS Banking API is running 🚀");
});

// 7. START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/auth", require("./src/routes/auth.routes"));
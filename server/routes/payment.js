const express = require("express");
const router = express.Router();
const {
  processPayment,
  generateToken,
} = require("../controllers/paymentController");

router.get("/getToken/:userId", generateToken);
router.post("/payment/:userId", processPayment);

module.exports = router;

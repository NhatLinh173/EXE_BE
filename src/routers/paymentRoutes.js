const express = require("express");
const paymentController = require("../controllers/paymentStatusController");
const payment = require("../models/payment");

const router = express.Router();

router.post("/payment", paymentController.createPaymentStatus);

module.exports = router;

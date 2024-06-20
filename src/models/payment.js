const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderCodeStatus: { type: String },
  orderCode: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("payment", paymentSchema);

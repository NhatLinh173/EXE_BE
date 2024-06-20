const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  shippingMethod: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  orderCode: {
    type: String,
    require: true,
  },
  orderStatus: {
    type: String,
    require: true,
  },
  orderCodeStatus: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);

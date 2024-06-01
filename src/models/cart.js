const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String },
  productId: { type: String },
  productName: { type: String },
  price: { type: Number },
  image: { type: String },
  quality: { type: Number },
});

module.exports = mongoose.model("cart", cartSchema);

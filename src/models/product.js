const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String },
  price: { type: Number },
  description: { type: String },
  quantity: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  image: { type: String },
});

module.exports = mongoose.model("product", productSchema);

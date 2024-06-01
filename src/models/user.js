const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  phone: { type: String, default: null },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);

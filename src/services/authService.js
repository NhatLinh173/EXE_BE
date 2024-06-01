// authService.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authService = {
  register: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await userModel.create({ email: userData.email, password: hashedPassword });
  },

  login: async (loginData) => {
    const user = await userModel.findOne({ email: loginData.email });
    if (!user) {
      throw new Error("User not found");
    }
    if (!(await bcrypt.compare(loginData.password, user.password))) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { email: user.email, id_user: user._id, role: user.role },
      "secret",
      {
        expiresIn: "60d",
      }
    );

    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.err("Error decoding token: ", err);
      } else {
        console.log("Decoded token: ", decoded);
      }
    });

    return token;
  },
};

module.exports = authService;

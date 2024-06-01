// userService.js
const userModel = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "EXE_secret_key_here";
const userService = {
  getProfile: async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  updateProfile: async (email, newData) => {
    try {
      // Kiểm tra newData.password và mã hóa nếu cần
      if (newData.password) {
        const hashedPassword = await bcrypt.hash(newData.password, 10);
        newData.password = hashedPassword;
      }

      // Cập nhật thông tin người dùng
      await userModel.updateOne({ email }, newData);

      // Tìm người dùng đã cập nhật
      const updateUser = await userModel.findOne({ email });

      // Kiểm tra nếu người dùng tồn tại
      if (updateUser && updateUser.email) {
        // Ký token với thông tin người dùng và secret
        const token = jwt.sign(
          {
            email: updateUser.email,
            password: updateUser.password,
          },
          SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        // Cập nhật token trong cơ sở dữ liệu
        await userModel.updateOne({ email }, { token });

        return token;
      } else {
        throw new Error("User email is null or undefined");
      }
    } catch (error) {
      throw error;
    }
  },
  getAllUser: async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.log("Error fetching user: ", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const deleteUser = await userModel.findByIdAndDelete(userId);
      return deleteUser;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
};

module.exports = userService;

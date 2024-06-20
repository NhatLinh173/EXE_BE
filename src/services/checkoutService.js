const Checkout = require("../models/Checkout");
const mongoose = require("mongoose");
const checkoutService = {
  createCheckout: async (checkoutData) => {
    try {
      const newCheckout = new Checkout(checkoutData);
      const savedCheckout = await newCheckout.save();
      return savedCheckout;
    } catch (error) {
      throw new Error("Error creating checkout: " + error.message);
    }
  },

  getOrdersByUserId: async (userId) => {
    try {
      const orders = await Checkout.find({ userId: userId });
      return orders;
    } catch (error) {
      throw new Error("Error getting order by user ID: " + error.message);
    }
  },

  getAllOrdersFromDatabase: async () => {
    try {
      const allOrders = await Checkout.find();
      return allOrders;
    } catch (error) {
      throw new Error("Error getting order fail: " + error.message);
    }
  },

  getOrdersByStatus: async (orderStatus) => {
    try {
      const order = await Checkout.find({
        orderStatus: orderStatus,
      });
      return order;
    } catch (error) {
      throw new Error("Error getting order by status: " + error.message);
    }
  },

  updateStatus: async (orderCodeStatus, newStatus, newOrderStatus) => {
    try {
      console.log("Received orderCodeStatus:", orderCodeStatus);
      console.log("Received newStatus:", newStatus);
      console.log("Received newOrderStatus:", newOrderStatus);
      const updatedCheckout = await Checkout.findOneAndUpdate(
        { orderCodeStatus: orderCodeStatus },
        { $set: { status: newStatus, orderStatus: newOrderStatus } },
        { new: true }
      );
      if (!updatedCheckout) {
        throw new Error("Checkout not found with provided orderCodeStatus");
      }
      console.log("Updated Checkout:", updatedCheckout);
      return updatedCheckout;
    } catch (error) {
      console.error("Error in updateStatus:", error);
      throw error;
    }
  },
  updateOrderStatus: async (orderCodeStatus, newOrderStatus) => {
    try {
      const updatedCheckout = await Checkout.findOneAndUpdate(
        { orderCodeStatus: orderCodeStatus },
        { orderStatus: newOrderStatus },
        { new: true }
      );
      if (!updatedCheckout) {
        throw new Error("Checkout not found with provided orderCodeStatus");
      }
      return updatedCheckout;
    } catch (error) {
      throw error;
    }
  },

  getPaidTransactions: async () => {
    try {
      const paidTransactions = await Checkout.find({ status: "PAID" });
      return paidTransactions;
    } catch (error) {
      throw new Error("Error fetching paid transaction");
    }
  },

  deleteTransactions: async (orderId) => {
    return await Checkout.findByIdAndDelete(orderId);
  },
};
module.exports = checkoutService;

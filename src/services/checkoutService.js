const Checkout = require("../models/Checkout");

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

  updateOrderStatus: async (_id, orderCode, status) => {
    try {
      const updateOrder = await Checkout.findOneAndUpdate(
        _id,
        { orderCode, status },
        { new: true }
      );

      if (!updateOrder) {
        throw new Error("Order not found");
      }

      return updateOrder;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = checkoutService;

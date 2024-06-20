const checkoutService = require("../services/checkoutService");
const checkoutController = {
  createCheckout: async (req, res) => {
    const {
      name,
      phone,
      address,
      email,
      shippingMethod,
      paymentMethod,
      items,
      totalPrice,
      shippingCost,
      totalAmount,
      status,
      userId,
      orderCodeStatus,
      orderStatus,
      idOrder,
    } = req.body;
    try {
      const checkoutData = {
        name,
        phone,
        address,
        email,
        shippingMethod,
        paymentMethod,
        items,
        totalPrice,
        shippingCost,
        totalAmount,
        status,
        userId,
        orderCodeStatus,
        orderStatus,
        idOrder,
      };
      const savedCheckout = await checkoutService.createCheckout(checkoutData);
      res.status(201).json(savedCheckout);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrdersByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const orders = await checkoutService.getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await checkoutService.getAllOrdersFromDatabase();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching order: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateStatus: async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const { orderCodeStatus, status, orderStatus } = req.body;
      if (!orderCodeStatus || !status || !orderStatus) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const updatedCheckout = await checkoutService.updateStatus(
        orderCodeStatus,
        status,
        orderStatus
      );

      return res.status(200).json(updatedCheckout);
    } catch (error) {
      console.error("Error updating status:", error);
      return res.status(500).json({ error: "Failed to update status" });
    }
  },

  getOrdersByStatus: async (req, res) => {
    try {
      const { orderStatus } = req.params;
      const orders = await checkoutService.getOrdersByStatus(orderStatus);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { orderCodeStatus } = req.body;
      const newOrderStatus = req.body.status;
      const updatedCheckout = await checkoutService.updateOrderStatus(
        orderCodeStatus,
        newOrderStatus
      );
      return res.status(200).json(updatedCheckout);
    } catch (error) {
      console.error("Error updating status:", error);
      return res.status(500).json({ error: "Failed to update status" });
    }
  },

  getPaidTransactions: async (req, res) => {
    try {
      const paidTransactions = await checkoutService.getPaidTransactions();
      res.json(paidTransactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      await checkoutService.deleteTransactions(req.params.id);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = checkoutController;

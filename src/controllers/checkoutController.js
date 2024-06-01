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
      orderCode,
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
        orderCode,
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
  updateOrder: async (req, res) => {
    const { _id, orderCode, status } = req.body;
    console.log("Received request to update order:", { id, status, orderCode });
    try {
      const updateOrder = await checkoutService.updateOrderStatus(
        orderCode,
        status,
        _id
      );
      res.json(updateOrder);
    } catch (error) {
      if (error.message === "Order not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};

module.exports = checkoutController;

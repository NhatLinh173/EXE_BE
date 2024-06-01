const Payment = require("../models/payment");

const paymentService = {
  createPayment: async (paymentData) => {
    const { userId, orderCode, status } = paymentData;
    if (!userId || !orderCode || !status) {
      throw new Error("Missing required fieds");
    }

    const newPayment = new Payment({ userId, orderCode, status });

    await newPayment.save();
    return newPayment;
  },
};

module.exports = paymentService;

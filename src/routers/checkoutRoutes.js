const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/", checkoutController.createCheckout);
router.get("/order/:userId", checkoutController.getOrdersByUserId);
router.get("/order/", checkoutController.getAllOrders);
router.get("/orders/status/:orderStatus", checkoutController.getOrdersByStatus);
router.put("/order/update-status", checkoutController.updateStatus);
router.get("/paid", checkoutController.getPaidTransactions);
router.delete("/remove/:id", checkoutController.deleteTransaction);

module.exports = router;

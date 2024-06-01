const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");

router.post("/", checkoutController.createCheckout);
router.get("/order/:userId", checkoutController.getOrdersByUserId);
router.get("/order/", checkoutController.getAllOrders);
router.put("/update-order", checkoutController.updateOrder);
module.exports = router;

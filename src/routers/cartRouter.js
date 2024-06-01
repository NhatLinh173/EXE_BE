const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addToCart", authMiddleware, cartController.createCart);
router.get("/allCart", authMiddleware, cartController.getAll);
router.get("/cartItem/:userId", authMiddleware, cartController.getCartByUserId);
router.delete(
  "/remove/:userId/:productId",
  authMiddleware,
  cartController.deleteProductFromCart
);
router.put(
  "/updateQuantity/:userId/:productId",
  authMiddleware,
  cartController.updateCartItemQuantity
);
module.exports = router;

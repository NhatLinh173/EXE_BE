const cart = require("../models/cart");
const cartService = require("../services/cartService");

const cartController = {
  createCart: async (req, res) => {
    try {
      const { userId, productId, productName, price, image, quality } =
        req.body;

      const newCart = await cartService.create({
        userId,
        productId,
        productName,
        price,
        image,
        quality,
      });

      res
        .status(201)
        .json({ message: "Cart saved successfully", cart: newCart });
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const cart = await cartService.getAllCart();
      res.status(201).json(cart);
    } catch (error) {
      console.error("Error fetching cart: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getCartByUserId: async (req, res) => {
    const userId = req.params.userId;
    try {
      const cart = await cartService.getCartByUserId(userId);
      res.json(cart);
    } catch (error) {
      console.error("Error fetching cart by user ID: ", error);
      res.status(500).json({ message: "Error fetching cart by user ID" });
    }
  },

  deleteProductFromCart: async (req, res) => {
    const { userId, productId } = req.params;
    try {
      const result = await cartService.removeProductFromCart(userId, productId);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  updateCartItemQuantity: async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
      const updateCart = await cartService.updateCartItemQuantity(
        userId,
        productId,
        quantity
      );
      res.status(200).json({
        message: "Product quantity update successfully",
        cart: updateCart,
      });
    } catch (error) {
      console.error("Error updating product quantity in cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = cartController;

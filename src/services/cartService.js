const Cart = require("../models/cart");

const cartService = {
  create: async (dataCart) => {
    try {
      const newData = new Cart(dataCart);
      const savedCart = await newData.save();
      return savedCart;
    } catch (error) {
      console.error("Error fetching cart", error);
      throw error;
    }
  },
  getAllCart: async () => {
    try {
      const cart = await Cart.find();

      return cart;
    } catch (error) {
      console.error("Error fetching cart: ", error);
      throw error;
    }
  },
  getCartByUserId: async (userId) => {
    try {
      const cart = await Cart.find({ userId: userId });
      return cart;
    } catch (error) {
      console.error("Error fetching cart by user ID: ", error);
      throw error;
    }
  },
  removeProductFromCart: async (userId, productId) => {
    try {
      await Cart.findOneAndDelete(
        { userId },
        { $pull: { products: { productId } } }
      );

      return { success: true, message: "Sản phẩm đã được xóa khỏi giỏ hàng" };
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  },

  updateCartItemQuantity: async (userId, productId, quantity) => {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {
          userId,
          productId,
        },
        { $set: { quality: quantity } },
        { new: true }
      );
      if (!updatedCart) {
        throw new Error("Cart not found for user or product not found in cart");
      }
      return updatedCart;
    } catch (error) {
      console.error("Error updating product quantity in cart: ", error);
      throw error;
    }
  },
};

module.exports = cartService;

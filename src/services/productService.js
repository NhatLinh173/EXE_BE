const Product = require("../models/product");

const productService = {
  createProduct: async (productData) => {
    try {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error("Error creating product: ", error);
      throw error;
    }
  },

  getAllProduct: async () => {
    try {
      const products = await Product.find();

      return products;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      console.error("Error fetching product with Id ${productId}", error);
      throw error;
    }
  },

  updateProduct: async (productId, newData) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        newData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    }
  },
};

module.exports = productService;

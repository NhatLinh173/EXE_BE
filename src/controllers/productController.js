const productService = require("../services/productService");

const productController = {
  create: async (req, res) => {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await productService.getAllProduct();
      res.status(201).json(products);
    } catch (error) {
      console.error("Error fetching product: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error fetching product: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const newData = req.body;
      const updateProduct = await productService.updateProduct(
        productId,
        newData
      );
      if (!updateProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(201).json(updateProduct);
    } catch (error) {
      console.error("Error updating product: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await productService.deleteProduct(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(`Error deleting product:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = productController;

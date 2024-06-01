const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/create", productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id/delete", productController.deleteProduct);
module.exports = router;

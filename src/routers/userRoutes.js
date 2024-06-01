const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, userController.profile);
router.put("/update-profile", authMiddleware, userController.updateProfile);
router.get("/getAll", authMiddleware, userController.getAllUser);
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

module.exports = router;

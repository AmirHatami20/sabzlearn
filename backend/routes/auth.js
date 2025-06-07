const express = require("express");

const authMiddleware = require("../middlewares/auth");

const authController = require("../controllers/auth");

const router = express.Router();

// Register user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Verify user
router.post("/verify", authController.verify);

// Get user info
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;

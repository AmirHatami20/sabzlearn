const express = require("express");

const isAdminMiddleware = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth");

const userController = require("../controllers/user");

const router = express.Router();

// Get all user
router.get("/", authMiddleware, isAdminMiddleware, userController.getAllUsers)

// Update user info
router.put("/", authMiddleware, userController.updateUser);

// Delete user
router.delete("/:id", authMiddleware, isAdminMiddleware, userController.deleteUser);

// Ban user
router.put("/ban/:id", authMiddleware, isAdminMiddleware, userController.banUser);

// Ban user
router.put("/unban/:id", authMiddleware, isAdminMiddleware, userController.unbanUser);

// Get user courses
router.get("/courses", authMiddleware, userController.getUserCourses);

// Get user basket
router.get("/basket", authMiddleware, userController.getUserBasket);

// Change user role
router.put("/role/:id", authMiddleware, isAdminMiddleware, userController.changeUserRole);

module.exports = router;

const express = require("express");

const isAdminMiddleware = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const offController = require("../controllers/off");

// Create off
router.post("/", authMiddleware, isAdminMiddleware, offController.createOff)

// Get all offs
router.get("/", authMiddleware, isAdminMiddleware, offController.getAllOff);

// Get one off
router.get("/:id", authMiddleware, isAdminMiddleware, offController.getOneOff);

// Delete off
router.delete("/:id", authMiddleware, isAdminMiddleware, offController.deleteOff);

// Set off to specific course
router.post("/use/:courseId", authMiddleware, offController.useOffCode);

// Set off to all course
router.post("/use/all", authMiddleware, isAdminMiddleware, offController.setOnAll);

module.exports = router;
const express = require("express");

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const commentController = require("../controllers/comment");

const router = express.Router();

// Create comment
router.post("/:id", authMiddleware, commentController.createComment)

// Get comments
router.get("/:id", commentController.getAllComment);

// Answer comment
router.post("/answer/:id", authMiddleware, isAdminMiddleware, commentController.answerComment);

// Accept comment
router.put("/accept/:id", authMiddleware, isAdminMiddleware, commentController.acceptComment);

// Reject comment
router.put("/reject/:id", authMiddleware, isAdminMiddleware, commentController.rejectComment);

// Delete comment
router.delete("/:id", authMiddleware, isAdminMiddleware, commentController.deleteComment);

module.exports = router;

const express = require("express");

const isAdminMiddleware = require("../middlewares/isAdmin");
const authMiddleware = require("../middlewares/auth");

const categoryController = require("../controllers/category");

const router = express.Router();

router.post("/", authMiddleware, isAdminMiddleware, categoryController.createCategory)

router.get("/", categoryController.getAllCategory);

router.put("/:id", authMiddleware, isAdminMiddleware, categoryController.updateCategory)

router.delete("/:id", authMiddleware, isAdminMiddleware, categoryController.deleteCategory);

module.exports = router;
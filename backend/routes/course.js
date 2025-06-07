const express = require("express");

const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const uploadImage = require("../middlewares/uploadImage");

const courseController = require("../controllers/course");

const router = express.Router();

// Create Course
router.post("/", authMiddleware, isAdminMiddleware, uploadImage.single("image"), courseController.createCourse);

// Get All
router.get("/", courseController.getAllCourse);

// Get Related
router.get("/related/:id", courseController.getRelated);

// Get by shortName
router.get("/:shortName", courseController.getCourseInfo);

// Register User
router.patch("/:id/register", authMiddleware, courseController.registerCourse);

// Add to Basket
router.patch("/:id/addToBasket", authMiddleware, courseController.addToBasket);

// Update Course
router.put("/:id", authMiddleware, isAdminMiddleware, courseController.updateCourse);

// Delete Course
router.delete("/:id", authMiddleware, isAdminMiddleware, courseController.deleteCourse);

module.exports = router;

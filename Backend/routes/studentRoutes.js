const express = require("express");

const {
  createStudent,
  getStudents,
  updateStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create student and assign bed
router.post("/", protect, createStudent);

// Get all students of logged-in owner
router.get("/", protect, getStudents);
router.put("/:id", protect, updateStudent);

module.exports = router;
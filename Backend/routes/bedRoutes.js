const express = require("express");

const {
  createBeds,
  getBeds,
} = require("../controllers/bedController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create beds for a room
router.post("/", protect, createBeds);

// Get beds for a room
router.get("/:roomId", protect, getBeds);

module.exports = router;
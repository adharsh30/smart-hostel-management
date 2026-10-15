const express = require("express");

const {
  createRoom,
  getRooms,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create room
router.post("/", protect, createRoom);

// Get rooms for a hostel
router.get("/:hostelId", protect, getRooms);

module.exports = router;
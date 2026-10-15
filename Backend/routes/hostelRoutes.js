const express = require("express");

const {
  createHostel,
  getMyHostels,
} = require("../controllers/hostelController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create hostel
router.post("/", protect, createHostel);

// Get logged-in owner's hostels
router.get("/", protect, getMyHostels);

module.exports = router;
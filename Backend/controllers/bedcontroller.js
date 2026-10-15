const Bed = require("../models/Bed");
const Room = require("../models/Room");
const Hostel = require("../models/Hostel");

// CREATE BEDS FOR A ROOM
const createBeds = async (req, res) => {
  try {
    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({
        message: "Room ID is required",
      });
    }

    // Check room
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check hostel belongs to logged-in owner
    const hostel = await Hostel.findOne({
      _id: room.hostelId,
      ownerId: req.user.id,
    });

    if (!hostel) {
      return res.status(403).json({
        message: "Not authorized to access this room",
      });
    }

    // Check if beds already exist
    const existingBeds = await Bed.countDocuments({
      roomId,
    });

    if (existingBeds > 0) {
      return res.status(400).json({
        message: "Beds already created for this room",
      });
    }

    // Create beds
    const beds = [];

    for (let i = 1; i <= room.totalBeds; i++) {
      beds.push({
        roomId: room._id,
        bedNumber: i,
        status: "vacant",
        studentId: null,
      });
    }

    const createdBeds = await Bed.insertMany(beds);

    res.status(201).json({
      message: "Beds created successfully",
      beds: createdBeds,
    });
  } catch (error) {
    console.error("Create Beds Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET BEDS FOR A ROOM
const getBeds = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check hostel belongs to logged-in owner
    const hostel = await Hostel.findOne({
      _id: room.hostelId,
      ownerId: req.user.id,
    });

    if (!hostel) {
      return res.status(403).json({
        message: "Not authorized to access this room",
      });
    }

    const beds = await Bed.find({
      roomId,
    }).sort({
      bedNumber: 1,
    });

    res.json({
      beds,
    });
  } catch (error) {
    console.error("Get Beds Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createBeds,
  getBeds,
};
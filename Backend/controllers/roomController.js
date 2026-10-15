const Room = require("../models/Room");
const Hostel = require("../models/Hostel");

// CREATE ROOM
const createRoom = async (req, res) => {
  try {
    const {
      hostelId,
      floorNumber,
      roomNumber,
      totalBeds,
    } = req.body;

    // Check required fields
    if (
      !hostelId ||
      !floorNumber ||
      !roomNumber ||
      !totalBeds
    ) {
      return res.status(400).json({
        message: "Please provide all room details",
      });
    }

    // Check if hostel exists
    const hostel = await Hostel.findOne({
      _id: hostelId,
      ownerId: req.user.id,
    });

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found",
      });
    }

    // Create room
    const room = await Room.create({
      hostelId,
      floorNumber,
      roomNumber,
      totalBeds,
      occupiedBeds: 0,
    });

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    console.error("Create Room Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ROOMS FOR A HOSTEL
const getRooms = async (req, res) => {
  try {
    const { hostelId } = req.params;

    // Make sure hostel belongs to logged-in owner
    const hostel = await Hostel.findOne({
      _id: hostelId,
      ownerId: req.user.id,
    });

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found",
      });
    }

    const rooms = await Room.find({
      hostelId,
    }).sort({
      floorNumber: 1,
      roomNumber: 1,
    });

    res.json({
      rooms,
    });
  } catch (error) {
    console.error("Get Rooms Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
};
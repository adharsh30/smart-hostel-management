const Hostel = require("../models/Hostel");

// CREATE HOSTEL
const createHostel = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      totalFloors,
      roomsPerFloor,
      bedsPerRoom,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !address ||
      !city ||
      !totalFloors ||
      !roomsPerFloor ||
      !bedsPerRoom
    ) {
      return res.status(400).json({
        message: "Please fill all hostel details",
      });
    }

    // Create hostel
    const hostel = await Hostel.create({
      ownerId: req.user.id,
      name,
      address,
      city,
      totalFloors,
      roomsPerFloor,
      bedsPerRoom,
    });

    res.status(201).json({
      message: "Hostel created successfully",
      hostel,
    });
  } catch (error) {
    console.error("Create Hostel Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET OWNER'S HOSTELS
const getMyHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({
      ownerId: req.user.id,
    });

    res.json({
      hostels,
    });
  } catch (error) {
    console.error("Get Hostels Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createHostel,
  getMyHostels,
};
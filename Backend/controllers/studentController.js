const Student = require("../models/Student");
const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      occupation,
      hostelId,
      roomId,
      bedId,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !phone ||
      !occupation ||
      !hostelId ||
      !roomId ||
      !bedId
    ) {
      return res.status(400).json({
        message: "Please fill all student details",
      });
    }

    // Check hostel belongs to logged-in owner
    const hostel = await Hostel.findOne({
      _id: hostelId,
      ownerId: req.user.id,
    });

    if (!hostel) {
      return res.status(404).json({
        message: "Hostel not found",
      });
    }

    // Check room
    const room = await Room.findOne({
      _id: roomId,
      hostelId,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check bed
    const bed = await Bed.findOne({
      _id: bedId,
      roomId,
    });

    if (!bed) {
      return res.status(404).json({
        message: "Bed not found",
      });
    }

    // Check if bed is already occupied
    if (bed.status === "occupied") {
      return res.status(400).json({
        message: "Bed is already occupied",
      });
    }

    // Create student
    const student = await Student.create({
      name,
      email,
      phone,
      occupation,
      hostelId,
      roomId,
      bedId,
      ownerId: req.user.id,
    });

    // Update bed
    bed.status = "occupied";
    bed.studentId = student._id;
    await bed.save();

    // Update room occupied beds
    room.occupiedBeds += 1;
    await room.save();

    res.status(201).json({
      message: "Student created and bed assigned successfully",
      student,
      bed,
      room,
    });
  } catch (error) {
    console.error("Create Student Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ALL STUDENTS
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({
      ownerId: req.user.id,
    })
      .populate("hostelId", "name city")
      .populate("roomId", "roomNumber floorNumber")
      .populate("bedId", "bedNumber status")
      .sort({
        createdAt: -1,
      });

    res.json({
      students,
    });
  } catch (error) {
    console.error("Get Students Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, occupation } = req.body;

    const student = await Student.findOne({
      _id: id,
      ownerId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (phone !== undefined) student.phone = phone;
    if (occupation !== undefined) student.occupation = occupation;

    await student.save();

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update Student Error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
};
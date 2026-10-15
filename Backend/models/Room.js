const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },

    floorNumber: {
      type: Number,
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    totalBeds: {
      type: Number,
      required: true,
      min: 1,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
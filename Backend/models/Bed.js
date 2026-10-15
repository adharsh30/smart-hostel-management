const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    bedNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["vacant", "occupied"],
      default: "vacant",
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bed", bedSchema);
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
problem: {
  type: String,
  required: true,
},

    status: {
      type: String,
      default: "pending", // pending | approved | rejected
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointments", appointmentSchema);

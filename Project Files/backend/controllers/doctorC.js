const Doctor = require("../schemas/doctorModel");
const User = require("../schemas/userModel");

// APPLY AS DOCTOR
const applyDoctor = async (req, res) => {
  try {
    const doctorData = {
      ...req.body,
      userId: req.userId,
      status: "pending",
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    await User.findByIdAndUpdate(req.userId, {
      isDoctor: false,
      type: "user",
    });

    res.status(201).json({
      message: "Doctor application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Doctor application failed",
      error,
    });
  }
};

// ADMIN APPROVE DOCTOR
const approveDoctor = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;

    await Doctor.findByIdAndUpdate(doctorId, {
      status: "approved",
    });

    const doctor = await Doctor.findById(doctorId);

    await User.findByIdAndUpdate(doctor.userId, {
      isDoctor: true,
      type: "doctor",
    });

    res.status(200).json({
      message: "Doctor approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Doctor approval failed",
      error,
    });
  }
};

// GET ALL APPROVED DOCTORS
const getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
      error,
    });
  }
};

module.exports = {
  applyDoctor,
  approveDoctor,
  getApprovedDoctors,
};

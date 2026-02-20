const express = require("express");
const {
  bookAppointment,
  updateAppointmentStatus,
  getUserAppointments,
  getDoctorAppointments,
cancelAppointment,

} = require("../controllers/appointmentC");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// USER ROUTES
router.post("/book", authMiddleware, bookAppointment);
router.get("/user-appointments", authMiddleware, getUserAppointments);

// DOCTOR ROUTES
router.post("/doctor-appointments", authMiddleware, getDoctorAppointments);
router.post("/update-status", authMiddleware, updateAppointmentStatus);
router.post("/cancel", authMiddleware, cancelAppointment);

module.exports = router;

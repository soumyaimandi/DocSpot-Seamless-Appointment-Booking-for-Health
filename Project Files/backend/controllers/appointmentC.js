const Appointment = require("../schemas/appointmentModel");

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      userId: req.userId,
      status: "pending",
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
    });
  }
};

// USER APPOINTMENTS
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      userId: req.userId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};

// DOCTOR APPOINTMENTS
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.body.doctorId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctor appointments",
    });
  }
};

// UPDATE STATUS
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    res.status(200).json({
      message: "Appointment status updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Status update failed",
    });
  }
};
// CANCEL APPOINTMENT (USER)
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "cancelled",
    });

    res.status(200).json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cancellation failed",
    });
  }
};


module.exports = {
  bookAppointment,
  getUserAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};


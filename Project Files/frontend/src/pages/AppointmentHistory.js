import { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentHistory.css";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments/user-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Cancel appointment function
  const cancelAppointment = async (id) => {
    try {
      await axios.post(
        "http://localhost:5000/api/appointments/cancel",
        { appointmentId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh list smoothly
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <h1>My Appointments</h1>

        {appointments.length === 0 ? (
          <p className="no-data">No appointments yet.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <div className="card-header">
                <h3>
                  {appt.doctorInfo.fullName || appt.doctorInfo.name}
                </h3>
                <span className={`status ${appt.status}`}>
                  {appt.status}
                </span>
              </div>

              <div className="card-body">
                <p>
                  <strong>Specialization:</strong>{" "}
                  {appt.doctorInfo.specialization}
                </p>
                <p>
                  <strong>Date:</strong> {appt.date}
                </p>
                <p>
                  <strong>Time:</strong> {appt.time}
                </p>
<p><strong>Problem:</strong> {appt.problem}</p>


                {/* ✅ Show cancel only if pending */}
                {appt.status === "pending" && (
                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(appt._id)}
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AppointmentHistory;

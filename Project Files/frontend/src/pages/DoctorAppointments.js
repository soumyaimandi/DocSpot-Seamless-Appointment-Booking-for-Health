import { useEffect, useState } from "react";
import axios from "axios";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/appointments/user-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/appointments/update-status",
      {
        appointmentId: id,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Status updated");
    window.location.reload();
  };

  return (
    <div>
      <h1>Doctor Appointments</h1>

      {appointments.map((appt) => (
        <div key={appt._id}>
          <p>{appt.doctorInfo.fullName}</p>
          <p>{appt.date}</p>
          <p>Status: {appt.status}</p>

          <button onClick={() => updateStatus(appt._id, "approved")}>
            Approve
          </button>

          <button onClick={() => updateStatus(appt._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoctorAppointments;

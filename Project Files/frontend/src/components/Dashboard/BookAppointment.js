import { useEffect, useState } from "react";
import axios from "axios";
import "./BookAppointment.css";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
 const [problem, setProblem] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/doctors/approved",
          {
            headers: {
  Authorization: `Bearer ${token}`,
},

          }
        );

        setDoctors(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);
  const bookAppointment = async () => {
  try {
    const token = localStorage.getItem("token");

    // find selected doctor object
    const selectedDoctor = doctors.find(
      (doc) => doc._id === doctorId
    );

    const res = await axios.post(
      "http://localhost:5000/api/appointments/book",
      {
        doctorId: doctorId,
        doctorInfo: {
          fullName: selectedDoctor.fullName,
          specialization: selectedDoctor.specialization,
        },
        userInfo: {
          name: "User", // optional (can improve later)
          email: "user@gmail.com",
        },
        date,
        time,
problem,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment booked successfully 🎉");
  } catch (error) {
    console.log(error);
    alert("Booking failed ❌");
  }
};

  return (
    <div className="book-page">
      <div className="book-card">
        <h1>📅 Book Appointment</h1>
        <p>Select doctor and preferred time</p>

        <div className="input-box">
          <span className="icon"></span>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fullName} ({doc.specialization})
              </option>
            ))}
          </select>
        </div>

        <div className="input-box">
          <span className="icon"></span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="input-box">
          <span className="icon"></span>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
<div className="input-box">
  <span className="icon">📝</span>
  <textarea
    placeholder="Describe your problem..."
    value={problem}
    onChange={(e) => setProblem(e.target.value)}
  />
</div>


        <button
  disabled={!doctorId || !date || !time}
  onClick={bookAppointment}
>
  Book Appointment
</button>

      </div>
    </div>
  );
}

export default BookAppointment;

import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>User Dashboard</h1>
        <p>Welcome to DocSpot — your healthcare companion</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/book")}
        >
          Book Appointment
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/appointments")}
        >
          View My Appointments
        </button>

        <button
          className="logout-btn"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;

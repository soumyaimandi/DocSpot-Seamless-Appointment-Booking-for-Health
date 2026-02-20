import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserDashboard from "./components/Dashboard/UserDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import BookAppointment from "./components/Dashboard/BookAppointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import DoctorAppointments from "./pages/DoctorAppointments";

function App() {
  return (
    <Routes>
<Route
  path="/book"
  element={
    <ProtectedRoute>
      <BookAppointment />
    </ProtectedRoute>
  }
/>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
<Route path="/appointments" element={<AppointmentHistory />} />
<Route path="/doctor-appointments" element={<DoctorAppointments />} />

      {/* 🔐 PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

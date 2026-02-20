import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import loginImg from "../../images/login.jpg";



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Smooth redirect
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
  <div className="auth-page">
   <div className="small-dot" style={{ top: "20%", left: "70%" }}></div>
<div className="small-dot" style={{ top: "60%", left: "30%" }}></div>
<div className="small-dot" style={{ top: "40%", left: "80%" }}></div>

    <div className="login-wrapper">
      
      {/* Left Side Image */}
      <div className="login-image">
        <img src={loginImg} alt="Login Visual" />
      </div>

      {/* Right Side Form */}
      <div className="auth-container">
        <h1>🏥 LOGIN</h1>
        <p>Welcome back to DocSpot</p>

        <div className="auth-card">
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={loginUser}>Login</button>

          {message && (
            <p style={{ marginTop: "15px", color: "#ff6b6b" }}>
              {message}
            </p>
          )}

          <div className="switch-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
);

}

export default Login;

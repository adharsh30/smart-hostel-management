import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../services/authService";
import { getHostels } from "../services/api";
function Login() {
  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      // Check selected role
      if (data.user.role !== role) {
        setError(`This account is registered as ${data.user.role}.`);
        setLoading(false);
        return;
      }

      // Redirect based on role
     // Redirect based on role
if (data.user.role === "owner") {
  try {
    const hostelData = await getHostels(data.token);

    if (hostelData.hostels && hostelData.hostels.length > 0) {
      // Existing owner → Dashboard
      navigate("/owner/dashboard");
    } else {
      // New owner → Create Hostel
      navigate("/owner/create-hostel");
    }
  } catch (error) {
    setError("Unable to check hostel details.");
  }
} else {
  navigate("/student/dashboard");
}
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <h1>Smart Hostel ERP</h1>

        <p>
          Digital Hostel Management Platform
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="Hostel"
        />
      </div>

      <div className="right-panel">

        <div className="role-buttons">

          <button
            type="button"
            className={role === "student" ? "active" : ""}
            onClick={() => {
              setRole("student");
              setError("");
            }}
          >
            Student Login
          </button>

          <button
            type="button"
            className={role === "owner" ? "active" : ""}
            onClick={() => {
              setRole("owner");
              setError("");
            }}
          >
            Owner Login
          </button>

        </div>

        <h2>
          {role === "student"
            ? "Student Login"
            : "Hostel Owner Login"}
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>

          </div>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <span> Register</span>
        </p>

      </div>

    </div>
  );
}

export default Login;
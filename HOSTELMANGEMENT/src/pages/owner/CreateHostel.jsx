import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const API_URL = "http://localhost:5000/api";

function CreateHostel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    totalFloors: "",
    roomsPerFloor: "",
    bedsPerRoom: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/hostels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          totalFloors: Number(formData.totalFloors),
          roomsPerFloor: Number(formData.roomsPerFloor),
          bedsPerRoom: Number(formData.bedsPerRoom),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create hostel");
      }

      alert("Hostel created successfully!");

      navigate("/owner/dashboard");
    } catch (err) {
      console.error("Create Hostel Error:", err);
      setError(err.message || "Failed to create hostel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "250px" }}>
        <Navbar />

        <div
          style={{
            minHeight: "calc(100vh - 80px)",
            background: "#f5f7fb",
            padding: "40px",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              background: "white",
              padding: "35px",
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h1>Create Your Hostel 🏠</h1>

            <p style={{ color: "#666" }}>
              Set up your hostel before managing rooms and students.
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Hostel Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                style={inputStyle}
              />

              <input
                type="number"
                name="totalFloors"
                placeholder="Total Floors"
                value={formData.totalFloors}
                onChange={handleChange}
                min="1"
                required
                style={inputStyle}
              />

              <input
                type="number"
                name="roomsPerFloor"
                placeholder="Rooms Per Floor"
                value={formData.roomsPerFloor}
                onChange={handleChange}
                min="1"
                required
                style={inputStyle}
              />

              <input
                type="number"
                name="bedsPerRoom"
                placeholder="Beds Per Room"
                value={formData.bedsPerRoom}
                onChange={handleChange}
                min="1"
                required
                style={inputStyle}
              />

              {error && (
                <p style={{ color: "red" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Creating Hostel..." : "Create Hostel"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "15px",
  boxSizing: "border-box",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px",
};

export default CreateHostel;
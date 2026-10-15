import { useEffect, useState } from "react";

import {
  getStudents,
  createStudent,
  getHostels,
  getRooms,
  getBeds,
} from "../../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
  });

  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBed, setSelectedBed] = useState("");

  useEffect(() => {
    loadStudents();
    loadHostels();
  }, []);

  const loadStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const data = await getStudents(token);
      setStudents(data.students || []);
    } catch (err) {
      console.error("Students Error:", err);
      setError(err.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const loadHostels = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setFormError("Please login first.");
        return;
      }

      const data = await getHostels(token);
      setHostels(data.hostels || []);
    } catch (err) {
      console.error("Hostel Error:", err);
      setFormError(err.message || "Failed to load hostels.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHostelChange = async (e) => {
    const hostelId = e.target.value;

    setSelectedHostel(hostelId);
    setSelectedRoom("");
    setSelectedBed("");
    setRooms([]);
    setBeds([]);

    if (!hostelId) return;

    try {
      const token = localStorage.getItem("token");

      const data = await getRooms(hostelId, token);
      setRooms(data.rooms || []);
    } catch (err) {
      console.error("Rooms Error:", err);
      setFormError(err.message || "Failed to load rooms.");
    }
  };

  const handleRoomChange = async (e) => {
    const roomId = e.target.value;

    setSelectedRoom(roomId);
    setSelectedBed("");
    setBeds([]);

    if (!roomId) return;

    try {
      const token = localStorage.getItem("token");

      const data = await getBeds(roomId, token);
      setBeds(data.beds || []);
    } catch (err) {
      console.error("Beds Error:", err);
      setFormError(err.message || "Failed to load beds.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setFormSuccess("");

    if (!selectedHostel || !selectedRoom || !selectedBed) {
      setFormError("Please select hostel, room and bed.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setFormError("Please login first.");
        return;
      }

      const studentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        occupation: formData.occupation,
        hostelId: selectedHostel,
        roomId: selectedRoom,
        bedId: selectedBed,
      };

      await createStudent(studentData, token);

      setFormSuccess("Student created successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        occupation: "",
      });

      setSelectedHostel("");
      setSelectedRoom("");
      setSelectedBed("");
      setRooms([]);
      setBeds([]);

      await loadStudents();
    } catch (err) {
      console.error("Create Student Error:", err);
      setFormError(err.message || "Failed to create student.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading students...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Students</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Students</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Close Form" : "+ Add Student"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "25px",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            maxWidth: "500px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Add New Student</h2>

          {/* HOSTEL */}
          <select
            value={selectedHostel}
            onChange={handleHostelChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
            }}
          >
            <option value="">Select Hostel</option>

            {hostels.map((hostel) => (
              <option key={hostel._id} value={hostel._id}>
                {hostel.name} - {hostel.city}
              </option>
            ))}
          </select>

          {/* ROOM */}
          {selectedHostel && (
            <select
              value={selectedRoom}
              onChange={handleRoomChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
              }}
            >
              <option value="">Select Room</option>

              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.roomNumber} - Floor {room.floorNumber}
                </option>
              ))}
            </select>
          )}

          {/* BED */}
          {selectedRoom && (
            <select
              value={selectedBed}
              onChange={(e) => setSelectedBed(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
              }}
            >
              <option value="">Select Bed</option>

              {beds
                .filter((bed) => bed.status === "vacant")
                .map((bed) => (
                  <option key={bed._id} value={bed._id}>
                    Bed {bed.bedNumber} - Vacant
                  </option>
                ))}
            </select>
          )}

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              boxSizing: "border-box",
            }}
          />

          {formError && (
            <p style={{ color: "red" }}>{formError}</p>
          )}

          {formSuccess && (
            <p style={{ color: "green" }}>{formSuccess}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Student
          </button>
        </form>
      )}

      <p>
        Total Students: <strong>{students.length}</strong>
      </p>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          {students.map((student) => (
            <div
              key={student._id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{student.name}</h2>

              <p>
                <strong>Occupation:</strong> {student.occupation}
              </p>

              <p>
                <strong>Email:</strong> {student.email}
              </p>

              <p>
                <strong>Phone:</strong> {student.phone}
              </p>

              <hr />

              <p>
                <strong>Hostel:</strong>{" "}
                {student.hostelId?.name || "N/A"}
              </p>

              <p>
                <strong>City:</strong>{" "}
                {student.hostelId?.city || "N/A"}
              </p>

              <p>
                <strong>Floor:</strong>{" "}
                {student.roomId?.floorNumber || "N/A"}
              </p>

              <p>
                <strong>Room:</strong>{" "}
                {student.roomId?.roomNumber || "N/A"}
              </p>

              <p>
                <strong>Bed:</strong>{" "}
                {student.bedId?.bedNumber || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      student.bedId?.status === "occupied"
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {student.bedId?.status || "N/A"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Students;
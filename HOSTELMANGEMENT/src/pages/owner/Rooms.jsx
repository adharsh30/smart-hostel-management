import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import FloorCard from "../../components/FloorCard";

import {
  getHostels,
  getRooms,
  getBeds,
  createRoom,
  createBeds,
} from "../../services/api";

import "./Rooms.css";

function Rooms() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Room form
  const [showForm, setShowForm] = useState(false);
  const [roomForm, setRoomForm] = useState({
    floorNumber: "",
    roomNumber: "",
    totalBeds: "",
  });

  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const loadRoomData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      // Get hostel
      const hostelData = await getHostels(token);
      const hostels = hostelData.hostels || [];

      if (hostels.length === 0) {
        setError("No hostel found.");
        return;
      }

      const hostel = hostels[0];

      // Get rooms
      const roomData = await getRooms(hostel._id, token);
      const rooms = roomData.rooms || [];

      // Get beds for every room
      const roomsWithBeds = await Promise.all(
        rooms.map(async (room) => {
          const bedData = await getBeds(room._id, token);
          if ((bedData.beds || []).length === 0) {
  try {
    await createBeds(room._id, token);
    bedData = await getBeds(room._id, token);
  } catch (bedError) {
    console.error(
      `Failed to create beds for room ${room.roomNumber}:`,
      bedError
    );
  }
}

         return {
  roomNumber: room.roomNumber,
  floorNumber: room.floorNumber,
  totalBeds: room.totalBeds,
  occupiedBeds: room.occupiedBeds,
  beds: (bedData.beds || []).map((bed) => ({
              id: bed._id,
              bedNumber: bed.bedNumber,
              occupied: bed.status === "occupied",
            }))
          };
        })
      );

      // Create floors
      const generatedFloors = Array.from(
        { length: hostel.totalFloors || 5 },
        (_, index) => {
          const floorNumber = index + 1;

          return {
            floorNumber,
            rooms: roomsWithBeds.filter(
              (room) => room.floorNumber === floorNumber
            ),
          };
        }
      );

      setFloors(generatedFloors);
    } catch (err) {
      console.error("Rooms Error:", err);
      setError(err.message || "Failed to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomData();
  }, []);

  const handleRoomChange = (e) => {
    setRoomForm({
      ...roomForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    setFormError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setFormError("Please login first.");
      return;
    }

    try {
      setFormLoading(true);

      // Get owner's hostel
      const hostelData = await getHostels(token);
      const hostels = hostelData.hostels || [];

      if (hostels.length === 0) {
        throw new Error("No hostel found.");
      }

      const hostel = hostels[0];

      // Create room
      const roomData = await createRoom(
        {
          hostelId: hostel._id,
          floorNumber: Number(roomForm.floorNumber),
          roomNumber: roomForm.roomNumber,
          totalBeds: Number(roomForm.totalBeds),
        },
        token
      );

      // Create beds automatically
      await createBeds(roomData.room._id, token);

      alert("Room and beds created successfully!");

      // Clear form
      setRoomForm({
        floorNumber: "",
        roomNumber: "",
        totalBeds: "",
      });

      setShowForm(false);

      // Reload rooms
      await loadRoomData();
    } catch (err) {
      console.error("Create Room Error:", err);

      setFormError(
        err.message || "Failed to create room."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Statistics
  const totalRooms = floors.reduce(
    (total, floor) => total + floor.rooms.length,
    0
  );

  const totalBeds = floors.reduce(
    (total, floor) =>
      total +
      floor.rooms.reduce(
        (roomTotal, room) => roomTotal + room.beds.length,
        0
      ),
    0
  );

  const occupiedBeds = floors.reduce(
    (total, floor) =>
      total +
      floor.rooms.reduce(
        (roomTotal, room) =>
          roomTotal +
          room.beds.filter((bed) => bed.occupied).length,
        0
      ),
    0
  );

  const vacantBeds = totalBeds - occupiedBeds;

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading rooms...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Rooms</h2>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="rooms-page">

          {/* HEADER */}
          <div className="rooms-header">

            <div>
              <h1>🏢 Hostel Rooms</h1>

              <p>
                Manage floors, rooms and bed availability
              </p>
            </div>

            <button
              className="add-room-btn"
              onClick={() => {
                setShowForm(!showForm);
                setFormError("");
              }}
            >
              {showForm ? "✕ Close" : "+ Add Room"}
            </button>

          </div>

          {/* ADD ROOM FORM */}

          {showForm && (
            <div
              style={{
                background: "white",
                padding: "25px",
                marginTop: "20px",
                marginBottom: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                maxWidth: "500px",
              }}
            >

              <h2>Add New Room</h2>

              <p style={{ color: "#666" }}>
                Add a room and automatically create its beds.
              </p>

              <form onSubmit={handleCreateRoom}>

                {/* FLOOR */}

                <input
                  type="number"
                  name="floorNumber"
                  placeholder="Floor Number"
                  value={roomForm.floorNumber}
                  onChange={handleRoomChange}
                  min="1"
                  required
                  style={inputStyle}
                />

                {/* ROOM */}

                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Room Number (Example: 102)"
                  value={roomForm.roomNumber}
                  onChange={handleRoomChange}
                  required
                  style={inputStyle}
                />

                {/* BEDS */}

                <input
                  type="number"
                  name="totalBeds"
                  placeholder="Number of Beds"
                  value={roomForm.totalBeds}
                  onChange={handleRoomChange}
                  min="1"
                  required
                  style={inputStyle}
                />

                {formError && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "15px",
                    }}
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  style={{
                    width: "100%",
                    padding: "13px",
                    marginTop: "20px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {formLoading
                    ? "Creating Room..."
                    : "Create Room"}
                </button>

              </form>

            </div>
          )}

          {/* SUMMARY CARDS */}

          <div className="room-summary">

            <div className="summary-card">
              <h3>{floors.length}</h3>
              <p>Total Floors</p>
            </div>

            <div className="summary-card">
              <h3>{totalRooms}</h3>
              <p>Total Rooms</p>
            </div>

            <div className="summary-card occupied">
              <h3>{occupiedBeds}</h3>
              <p>Occupied Beds</p>
            </div>

            <div className="summary-card vacant">
              <h3>{vacantBeds}</h3>
              <p>Vacant Beds</p>
            </div>

          </div>

          {/* LEGEND */}

          <div className="bed-legend">

            <span>
              <span className="legend-box vacant"></span>
              Vacant Bed
            </span>

            <span>
              <span className="legend-box occupied"></span>
              Occupied Bed
            </span>

          </div>

          {/* FLOORS */}

          {floors.map((floor) => (

            <FloorCard
              key={floor.floorNumber}
              floor={floor}
            />

          ))}

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

export default Rooms;
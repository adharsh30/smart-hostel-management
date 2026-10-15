import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";
import FloorCard from "../../components/FloorCard";

import {
  getHostels,
  getRooms,
  getBeds,
  getStudents,
} from "../../services/api";

import "./Dashboard.css";

function Dashboard() {
  const [hostel, setHostel] = useState(null);
  const [floors, setFloors] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      // Get owner's hostel
      const hostelData = await getHostels(token);

      if (!hostelData.hostels || hostelData.hostels.length === 0) {
        setError("No hostel found.");
        return;
      }

      const currentHostel = hostelData.hostels[0];

      setHostel(currentHostel);

      // Get rooms
      const roomData = await getRooms(
        currentHostel._id,
        token
      );

      const rooms = roomData.rooms || [];

      // Get beds for every room
      const roomsWithBeds = await Promise.all(
        rooms.map(async (room) => {
          const bedData = await getBeds(
            room._id,
            token
          );

          return {
            ...room,
            beds: bedData.beds || [],
          };
        })
      );

      // Group rooms by floor
      const floorMap = {};

      roomsWithBeds.forEach((room) => {
        if (!floorMap[room.floorNumber]) {
          floorMap[room.floorNumber] = [];
        }

        floorMap[room.floorNumber].push(room);
      });

      const floorData = Object.keys(floorMap)
        .sort((a, b) => Number(a) - Number(b))
        .map((floorNumber) => ({
          floorNumber: Number(floorNumber),
          rooms: floorMap[floorNumber],
        }));

      setFloors(floorData);

      // Get students
      const studentData = await getStudents(token);

      setStudents(studentData.students || []);
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(
        err.message || "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // Total beds
  const totalBeds = floors.reduce(
    (total, floor) =>
      total +
      floor.rooms.reduce(
        (roomTotal, room) =>
          roomTotal + room.beds.length,
        0
      ),
    0
  );

  // Occupied beds
  const occupiedBeds = floors.reduce(
    (total, floor) =>
      total +
      floor.rooms.reduce(
        (roomTotal, room) =>
          roomTotal +
          room.beds.filter(
            (bed) => bed.status === "occupied"
          ).length,
        0
      ),
    0
  );

  // Vacant beds
  const vacantBeds = totalBeds - occupiedBeds;

  // Total rooms
  const totalRooms = floors.reduce(
    (total, floor) =>
      total + floor.rooms.length,
    0
  );

  // Loading screen
  if (loading) {
    return (
      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar />

          <main className="dashboard-main">
            <h2>Loading dashboard...</h2>
          </main>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="dashboard-page">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar />

          <main className="dashboard-main">
            <h2>Dashboard</h2>

            <p style={{ color: "red" }}>
              {error}
            </p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <main className="dashboard-main">

          {/* Welcome */}

          <div className="welcome-section">

            <h2>
              Welcome back, Adharsh 👋
            </h2>

            <p>
              Here's what's happening in your
              hostel today.
            </p>

          </div>


          {/* Dashboard Cards */}

          <div className="cards">

            <DashboardCard
              title="Total Students"
              value={students.length}
              color="#3B82F6"
            />

            <DashboardCard
              title="Vacant Beds"
              value={vacantBeds}
              color="#22C55E"
            />

            <DashboardCard
              title="Occupied Beds"
              value={occupiedBeds}
              color="#EF4444"
            />

            <DashboardCard
              title="Total Rooms"
              value={totalRooms}
              color="#8B5CF6"
            />

            <DashboardCard
              title="Monthly Income"
              value="₹0"
              color="#F59E0B"
            />

            <DashboardCard
              title="Monthly Expenses"
              value="₹0"
              color="#EF4444"
            />

            <DashboardCard
              title="Monthly Profit"
              value="₹0"
              color="#8B5CF6"
            />

            <DashboardCard
              title="Pending Fees"
              value="0"
              color="#DC2626"
            />

          </div>


          {/* Hostel Rooms */}

          <section className="hostel-section">

            <div className="hostel-heading">

              <div>

                <h1>
                  {hostel?.name || "Hostel Rooms"}
                </h1>

                <p>
                  {hostel?.city || ""}
                  {" • "}
                  {floors.length} Floors
                  {" • "}
                  {totalRooms} Rooms
                </p>

              </div>


              {/* Legend */}

              <div className="room-legend">

                <div className="legend-item">

                  <span className="legend-box vacant-box"></span>

                  Vacant

                </div>


                <div className="legend-item">

                  <span className="legend-box occupied-box"></span>

                  Occupied

                </div>

              </div>

            </div>


            {/* Real database floors */}

            {floors.map((floor) => (

              <FloorCard
                key={floor.floorNumber}
                floor={floor}
              />

            ))}

          </section>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;
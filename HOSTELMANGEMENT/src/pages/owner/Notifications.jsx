import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Notifications() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "250px" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Notifications</h1>

          <p>View important hostel notifications here.</p>

          <div
            style={{
              marginTop: "25px",
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>🔔 Notifications</h2>

            <div style={{ marginTop: "20px" }}>
              <p>✅ Hostel dashboard is working correctly.</p>
              <p>👤 2 students are currently registered.</p>
              <p>🛏️ 2 beds are currently vacant.</p>
              <p>💰 No pending fee alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
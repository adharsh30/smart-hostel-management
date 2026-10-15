import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Settings() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "250px" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Settings</h1>

          <p>Manage your hostel settings.</p>

          <div
            style={{
              marginTop: "25px",
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              maxWidth: "600px",
            }}
          >
            <h2>Hostel Settings</h2>

            <div style={{ marginTop: "20px" }}>
              <label>Hostel Name</label>

              <input
                type="text"
                value="Smart Hostel"
                readOnly
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label>City</label>

              <input
                type="text"
                value="Hyderabad"
                readOnly
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label>Total Floors</label>

              <input
                type="text"
                value="5"
                readOnly
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  marginTop: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
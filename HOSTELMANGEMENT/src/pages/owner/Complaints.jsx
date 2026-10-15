import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Complaints() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "250px" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Complaints</h1>

          <p>Manage hostel complaints from this page.</p>

          <div
            style={{
              marginTop: "25px",
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>No New Complaints</h2>
            <p>
              There are currently no pending complaints from students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
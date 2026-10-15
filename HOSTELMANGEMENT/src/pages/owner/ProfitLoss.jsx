import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function ProfitLoss() {
  const income = 0;
  const expenses = 0;
  const profit = income - expenses;

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "250px" }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Profit & Loss</h1>

          <p>View your hostel's monthly financial summary.</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>Monthly Income</h3>
              <h2>₹{income}</h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>Monthly Expenses</h3>
              <h2>₹{expenses}</h2>
            </div>

            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>Monthly Profit</h3>
              <h2>₹{profit}</h2>
            </div>
          </div>

          <div
            style={{
              marginTop: "30px",
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Financial Summary</h2>

            <p>
              Income: <strong>₹{income}</strong>
            </p>

            <p>
              Expenses: <strong>₹{expenses}</strong>
            </p>

            <p>
              Profit: <strong>₹{profit}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitLoss;
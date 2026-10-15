import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Fees() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      room: "101",
      fee: 6000,
      status: "Paid",
      date: "01 Oct 2026",
    },
    {
      id: 2,
      name: "Arjun Kumar",
      room: "101",
      fee: 6000,
      status: "Pending",
      date: "-",
    },
  ]);

  const markAsPaid = (id) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? {
              ...payment,
              status: "Paid",
              date: "04 Oct 2026",
            }
          : payment
      )
    );
  };

  const totalFees = payments.reduce(
    (total, payment) => total + payment.fee,
    0
  );

  const paidAmount = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((total, payment) => total + payment.fee, 0);

  const pendingAmount = totalFees - paidAmount;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "30px",
          }}
        >
          {/* HEADER */}

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "30px",
              }}
            >
              💰 Fees & Payments
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Manage monthly hostel fees and payment status
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div className="summary-card">
              <h3>₹{totalFees.toLocaleString()}</h3>
              <p>Total Monthly Fees</p>
            </div>

            <div
              className="summary-card"
              style={{
                borderLeft: "5px solid #22c55e",
              }}
            >
              <h3 style={{ color: "#16a34a" }}>
                ₹{paidAmount.toLocaleString()}
              </h3>

              <p>Paid Amount</p>
            </div>

            <div
              className="summary-card"
              style={{
                borderLeft: "5px solid #ef4444",
              }}
            >
              <h3 style={{ color: "#dc2626" }}>
                ₹{pendingAmount.toLocaleString()}
              </h3>

              <p>Pending Amount</p>
            </div>
          </div>

          {/* PAYMENT TABLE */}

          <div
            style={{
              background: "white",
              borderRadius: "14px",
              marginTop: "30px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              overflowX: "auto",
            }}
          >
            <h2>Student Fee Records</h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: "14px" }}>Student</th>
                  <th style={{ padding: "14px" }}>Room</th>
                  <th style={{ padding: "14px" }}>
                    Monthly Fee
                  </th>
                  <th style={{ padding: "14px" }}>
                    Status
                  </th>
                  <th style={{ padding: "14px" }}>
                    Payment Date
                  </th>
                  <th style={{ padding: "14px" }}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    style={{
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "14px" }}>
                      <strong>{payment.name}</strong>
                    </td>

                    <td style={{ padding: "14px" }}>
                      {payment.room}
                    </td>

                    <td style={{ padding: "14px" }}>
                      ₹{payment.fee.toLocaleString()}
                    </td>

                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "bold",
                          background:
                            payment.status === "Paid"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            payment.status === "Paid"
                              ? "#166534"
                              : "#991b1b",
                        }}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td style={{ padding: "14px" }}>
                      {payment.date}
                    </td>

                    <td style={{ padding: "14px" }}>
                      {payment.status === "Pending" ? (
                        <button
                          onClick={() =>
                            markAsPaid(payment.id)
                          }
                          style={{
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "7px",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "#16a34a",
                            fontWeight: "bold",
                          }}
                        >
                          ✓ Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INFORMATION */}

          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              background: "#eff6ff",
              borderRadius: "10px",
              color: "#1e40af",
            }}
          >
            <strong>Demo:</strong> Click "Mark as Paid" to
            update the student's payment status.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fees;
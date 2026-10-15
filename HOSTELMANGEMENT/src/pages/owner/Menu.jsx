import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Menu() {
  const [menu, setMenu] = useState({
    breakfast: "Idly, Sambar & Chutney",
    lunch: "Rice, Dal, Vegetable Curry & Curd",
    dinner: "Roti, Paneer Curry & Rice",
  });

  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value,
    });
  };

  const saveMenu = () => {
    setEditing(false);
    setMessage("Today's menu updated successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>

          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>
                🍛 Hostel Menu
              </h1>

              <p style={{ color: "#64748b" }}>
                Manage daily meals for hostel residents
              </p>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              style={{
                padding: "11px 20px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
              }}
            >
              {editing ? "Cancel" : "✏️ Edit Menu"}
            </button>
          </div>

          {/* SUCCESS MESSAGE */}

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "14px",
                background: "#dcfce7",
                color: "#166534",
                borderRadius: "8px",
              }}
            >
              ✓ {message}
            </div>
          )}

          {/* TODAY */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "14px",
              marginTop: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            }}
          >
            <h2>Today's Menu</h2>

            {/* BREAKFAST */}

            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <h3>🌅 Breakfast</h3>

              {editing ? (
                <input
                  name="breakfast"
                  value={menu.breakfast}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    boxSizing: "border-box",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p>{menu.breakfast}</p>
              )}
            </div>

            {/* LUNCH */}

            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <h3>☀️ Lunch</h3>

              {editing ? (
                <input
                  name="lunch"
                  value={menu.lunch}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    boxSizing: "border-box",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p>{menu.lunch}</p>
              )}
            </div>

            {/* DINNER */}

            <div
              style={{
                padding: "20px 0",
              }}
            >
              <h3>🌙 Dinner</h3>

              {editing ? (
                <input
                  name="dinner"
                  value={menu.dinner}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    boxSizing: "border-box",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <p>{menu.dinner}</p>
              )}
            </div>

            {editing && (
              <button
                onClick={saveMenu}
                style={{
                  marginTop: "15px",
                  padding: "12px 25px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#22c55e",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                💾 Save Menu
              </button>
            )}
          </div>

          {/* TOMORROW */}

          <div
            style={{
              background: "#eff6ff",
              padding: "25px",
              borderRadius: "14px",
              marginTop: "25px",
            }}
          >
            <h2>📅 Tomorrow's Menu</h2>

            <p>
              <strong>Breakfast:</strong> Dosa & Chutney
            </p>

            <p>
              <strong>Lunch:</strong> Rice, Sambar & Chicken Curry
            </p>

            <p>
              <strong>Dinner:</strong> Roti & Mixed Vegetable Curry
            </p>
          </div>

          {/* NOTE */}

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#fff7ed",
              borderRadius: "10px",
              color: "#9a3412",
            }}
          >
            <strong>📢 Kitchen Notice</strong>

            <p>
              Menu may change depending on ingredient
              availability.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Menu;
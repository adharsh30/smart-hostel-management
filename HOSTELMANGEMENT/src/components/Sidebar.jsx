import {
  LayoutDashboard,
  Users,
  Bed,
  IndianRupee,
  ChartColumn,
  UtensilsCrossed,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/owner/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/owner/students",
      icon: Users,
    },
    {
      name: "Rooms",
      path: "/owner/rooms",
      icon: Bed,
    },
    {
      name: "Fees",
      path: "/owner/fees",
      icon: IndianRupee,
    },
    {
      name: "Profit",
      path: "/owner/profit",
      icon: ChartColumn,
    },
    {
      name: "Menu",
      path: "/owner/menu",
      icon: UtensilsCrossed,
    },
    {
      name: "Complaints",
      path: "/owner/complaints",
      icon: ClipboardList,
    },
    {
      name: "Notifications",
      path: "/owner/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/owner/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        <h2>🏠 Smart Hostel ERP</h2>
      </div>

      <ul>

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <li
              key={item.path}
              className={isActive ? "active" : ""}
            >
              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Icon size={22} />

                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

      </ul>

      <button
        className="logout"
        onClick={handleLogout}
      >
        <LogOut size={20} />

        Logout
      </button>

    </div>
  );
}

export default Sidebar;
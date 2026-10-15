import "./Navbar.css";
import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar">

      <div>

        <h1>Dashboard</h1>

        <p>Welcome back 👋</p>

      </div>

      <div className="nav-right">

        <div className="icon">

          <Search size={20} />

        </div>

        <div className="icon">

          <Bell size={20} />

        </div>

        <div className="profile">

          <UserCircle size={36} />

          <div>

            <h4>Adharsh</h4>

            <small>Hostel Owner</small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;
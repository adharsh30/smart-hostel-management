import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div>

      {/* Navbar */}

      <nav className="navbar">

        <h2 className="logo">
          Smart Hostel ERP
        </h2>

        <ul>

          <li>Home</li>

          <li>Features</li>

          <li>About</li>

          <li>Contact</li>

          <li>
             <Link
  to="/login"
  style={{
    display: "inline-block",
    padding: "14px 25px",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  }}
>
  Login
</Link>
          </li>

        </ul>

      </nav>

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-text">

          <h1>

            Smart Hostel
            <span> Management</span>

          </h1>

          <p>

            Search hostels, pre-book rooms,
            manage hostel fees,
            complaints,
            menu,
            and hostel operations
            digitally.

          </p>

          <div>

            <button className="primary">

              Find Hostels

            </button>

            <Link to="/login" className="secondary">
               Owner Portal
             </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
            alt="Hostel"
          />

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>

          Why Choose Smart Hostel ERP?

        </h2>

        <div className="cards">

          <div className="card">

            🏠

            <h3>

              Search Hostels

            </h3>

            <p>

              View nearby hostels and available rooms.

            </p>

          </div>

          <div className="card">

            📅

            <h3>

              Pre Book Beds

            </h3>

            <p>

              Reserve your hostel before joining.

            </p>

          </div>

          <div className="card">

            💰

            <h3>

              Fee Tracking

            </h3>

            <p>

              Track payments and due dates.

            </p>

          </div>

          <div className="card">

            🍽

            <h3>

              Daily Menu

            </h3>

            <p>

              Students can check today's menu.

            </p>

          </div>

          <div className="card">

            📊

            <h3>

              Analytics

            </h3>

            <p>

              Owner can monitor profit & expenses.

            </p>

          </div>

          <div className="card">

            📢

            <h3>

              Notifications

            </h3>

            <p>

              Receive important hostel updates.

            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer>

        © 2026 Smart Hostel ERP

      </footer>

    </div>
  );
}

export default Home;
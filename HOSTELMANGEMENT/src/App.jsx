import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/owner/Dashboard";
import Rooms from "./pages/owner/Rooms";
import Students from "./pages/owner/Students";
import Fees from "./pages/owner/Fees";
import ProfitLoss from "./pages/owner/ProfitLoss";
import Menu from "./pages/owner/Menu";
import Complaints from "./pages/owner/Complaints";
import Notifications from "./pages/owner/Notifications";
import Settings from "./pages/owner/Settings";
import CreateHostel from "./pages/owner/CreateHostel";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Owner Pages */}
        <Route path="/owner/dashboard" element={<Dashboard />} />
        <Route path="/owner/rooms" element={<Rooms />} />
        <Route path="/owner/students" element={<Students />} />
        <Route path="/owner/fees" element={<Fees />} />
        <Route path="/owner/profit" element={<ProfitLoss />} />
        <Route path="/owner/menu" element={<Menu />} />
        <Route path="/owner/complaints" element={<Complaints />} />
        <Route path="/owner/notifications" element={<Notifications />} />
        <Route path="/owner/settings" element={<Settings />} />
        <Route
  path="/owner/create-hostel"
  element={<CreateHostel />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
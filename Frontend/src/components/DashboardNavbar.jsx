import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/DashboardNavbar.css";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="dashboardNav">
      <div
        className="dashboardNavLogo"
        onClick={() => navigate("/dashboard")}
      >
        Serenity Hub
      </div>

      <ul className="dashboardNavLinks">
        {/* ✅ DASHBOARD ADDED */}
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>

        <li onClick={() => navigate("/professionals")}>Professionals</li>
        <li onClick={() => navigate("/calm-mind")}>Calm Mind</li>
      </ul>

      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default DashboardNavbar;

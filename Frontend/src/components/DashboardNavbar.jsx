import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/DashboardNavbar.css";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="dashboardNav">
        <div className="dashboardNavLogo" onClick={() => handleNav("/dashboard")}>
          Serenity Hub
        </div>

        <ul className="dashboardNavLinks">
          <li onClick={() => handleNav("/dashboard")}>Dashboard</li>
          <li onClick={() => handleNav("/professionals")}>Professionals</li>
          <li onClick={() => handleNav("/calm-mind")}>Calm Mind</li>
          <li onClick={() => handleNav("/profile")}>Profile</li>
        </ul>

        <div className="dashboardNavActions">
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <ul className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <li onClick={() => handleNav("/dashboard")}>Dashboard</li>
        <li onClick={() => handleNav("/professionals")}>Professionals</li>
        <li onClick={() => handleNav("/calm-mind")}>Calm Mind</li>
        <li onClick={() => handleNav("/profile")}>Profile</li>
        <li>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default DashboardNavbar;
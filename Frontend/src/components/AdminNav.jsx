import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminNav.css";

const AdminNav = () => {
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
      <nav className="adminNav">
        <div className="adminNavLogo" onClick={() => handleNav("/admin/dashboard")}>
          Serenity Hub <span style={{ fontWeight: 400 }}>(Admin)</span>
        </div>

        <ul className="adminNavLinks">
          <li onClick={() => handleNav("/admin/dashboard")}>Stats</li>
          <li onClick={() => handleNav("/admin/appointments")}>Appointments</li>
          <li onClick={() => handleNav("/admin/add-professional")}>Book</li>
          <li onClick={() => handleNav("/admin/professionals")}>Manage</li>
        </ul>

        <div className="adminNavActions">
          <button className="adminLogoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <ul className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <li onClick={() => handleNav("/admin/dashboard")}>Stats</li>
        <li onClick={() => handleNav("/admin/appointments")}>Appointments</li>
        <li onClick={() => handleNav("/admin/add-professional")}>Book</li>
        <li onClick={() => handleNav("/admin/professionals")}>Manage</li>
        <li>
          <button className="adminLogoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default AdminNav;
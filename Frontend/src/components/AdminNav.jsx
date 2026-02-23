import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminNav.css";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="adminNav">
      <div className="adminNavLogo" onClick={() => navigate("/admin/dashboard")}>
        Serenity Hub <span style={{ fontWeight: 400 }}>(Admin)</span>
      </div>

      <ul className="adminNavLinks">
        <li onClick={() => navigate("/admin/dashboard")}>Stats</li>
        <li onClick={() => navigate("/admin/appointments")}>Appointments</li>
<li onClick={() => navigate("/admin/add-professional")}>Book</li>
      </ul>

      <div className="adminNavActions">
        <ul className="adminNavLinks">
          <li onClick={() => navigate("/admin/professionals")}>
  Manage
</li>
        </ul>

        <button className="adminLogoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Navbar.css"; // separate CSS

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logoSection" onClick={() => navigate("/")}>
        <span className="navBrandTitle">Serenity Hub</span>
      </div>

      <ul className="navLinks">
        <li onClick={() => navigate("/")}>HOME</li>
        {/* ❌ REMOVED Professionals */}
        <li onClick={() => navigate("/about")}>ABOUT US</li>
        <li onClick={() => navigate("/contact")}>CONTACT</li>
      </ul>
    </nav>
  );
};

export default Navbar;

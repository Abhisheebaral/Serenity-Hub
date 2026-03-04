import React from "react";
import "../style/Footer.css"; // separate CSS

const Footer = () => {
  return (
    <footer>
      <p>
      </p>
      <p>
        © {new Date().getFullYear()} Serenity Hub. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;

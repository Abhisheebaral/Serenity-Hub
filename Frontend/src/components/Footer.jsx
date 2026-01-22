import React from "react";
import "../style/Footer.css"; // separate CSS

const Footer = () => {
  return (
    <footer>
      <p>
        Disclaimer: This is a publicly generated database. We do not assume legal responsibility for the quality of services listed.
      </p>
      <p>
        © {new Date().getFullYear()} Serenity Hub. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;

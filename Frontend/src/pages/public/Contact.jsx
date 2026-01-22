import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import "../../style/Contact.css";
const Contact = () => {
  return (
    <div className="contactPage">
      <Navbar />

      <section className="contactHero">
        <h1>Contact Us</h1>
        <p>Your journey to wellness is supported every step of the way.</p>
      </section>

      <section className="contactContent">
        <div className="contactGrid">
          
          <div className="contactCard">
            <div className="iconBox">📍</div>
            <h3>Our Location</h3>
            <p>Chabahil,kathmandu<br/>Near Medicare Hospital</p>
          </div>

          <div className="contactCard">
            <div className="iconBox">✉️</div>
            <h3>Email Us</h3>
            <p>support@serenityhub.com<br/>info@serenityhub.com</p>
          </div>

          <div className="contactCard" style={{ animationDelay: "1.4s" }}>
            <div className="iconBox">📞</div>
            <h3>Call Us</h3>
            <p>9843457893<br/>Mon-Fri, 9am - 6pm</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
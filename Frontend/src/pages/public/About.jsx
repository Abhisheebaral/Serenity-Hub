import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import "../../style/About.css";

const About = () => {
  return (
    <div className="aboutPage">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="aboutHero">
        <h1>About Serenity Hub</h1>
        <p>Your journey to well-being starts here</p>
      </section>

      {/* Mission Section */}
      <section className="aboutContent">
        <div className="missionSection">
          
          {/* Left Image */}
          <div className="missionImage">
            <img
              src="/images/aboutus.png"
              alt="About Serenity Hub"
            />
          </div>

          {/* Right Text */}
          <div className="missionText">
            <h2>Our Mission</h2>
            <p>
              To provide compassionate and accessible mental health support by
              connecting individuals with trusted professionals, while fostering
              a community of healing, understanding, and personal growth.
            </p>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="infoCards">
          <div className="infoCard">
            <h3>Our Vision</h3>
            <p>
              A world where mental wellness is a priority and everyone has access
              to the support they need to live a balanced and fulfilling life.
            </p>
          </div>

          <div className="infoCard">
            <h3>Our Values</h3>
            <ul>
              <li>Compassion</li>
              <li>Inclusion</li>
              <li>Empowerment</li>
              <li>Confidentiality</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;

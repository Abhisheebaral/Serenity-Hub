import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import "../../style/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <Navbar />

      {/* Hero Section */}
      <header className="heroSection">
        <div className="heroImageFull">
          <img
            src="/images/home.png"
            alt="Serenity Hub Background"
            className="bgImg"
          />
          <div className="heroOverlay"></div>
        </div>

        <div className="heroCenterContent">
          <h1 className="heroTitle">Find Mental Health Professionals</h1>
          <p className="heroSubtitle">Your journey to wellness starts here.</p>

          <div className="heroBtnGroup">
            <button className="glassBtn" onClick={() => navigate("/login")}>
              LOG IN
            </button>
            <button className="glassBtn" onClick={() => navigate("/register")}>
              REGISTER
            </button>
          </div>
        </div>
      </header>

      {/* Learn More Section */}
      <section className="learnMoreSection">
        <h2 className="learnMoreTitle">Learn More</h2>
        <div className="learnMoreContainers">
          <div className="learnCard" onClick={() => navigate("/about")}>
            <h3>About Serenity Hub</h3>
            <p>
              Serenity Hub is dedicated to connecting you with mental health professionals
              to support your wellness journey.
            </p>
          </div>
          <div className="learnCard" onClick={() => navigate("/professionals")}>
            <h3>Mental Health Professionals</h3>
            <p>
              Discover a range of qualified therapists and counselors ready to assist you.
            </p>
          </div>
          <div className="learnCard" onClick={() => navigate("/contact")}>
            <h3>Contact Us</h3>
            <p>Get in touch with us for any queries or support you need.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

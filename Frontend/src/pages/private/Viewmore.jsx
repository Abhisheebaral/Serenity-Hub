import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/Viewmore.css";

const professionalsData = {
  1: {
    name: "Dr. Reema Karki",
    role: "Psychologist",
    image: "/images/profileimage.png",
    location: "Kathmandu, Lalitpur",
    education: "M.A. Psychology",
    hours: "9 AM – 5 PM",
    fees: "Rs. 1000 – 2000",
    bio: "Dr. Reema Karki is an experienced psychologist specializing in anxiety, stress management, and emotional well-being. She believes in compassionate, evidence-based therapy."
  },
  2: {
    name: "Dr. Rahul Shah",
    role: "Clinical Psychologist",
    image: "/images/profileimageboy.png",
    location: "Kathmandu",
    education: "M.Phil Clinical Psychology",
    hours: "10 AM – 5 PM",
    fees: "Rs. 1000 – 1500",
    bio: "Dr. Rahul Shah focuses on clinical assessments, therapy for depression, and long-term mental health care."
  },
  3: {
    name: "Sara Shrestha",
    role: "Licensed Therapist",
    image: "/images/profileimage.png",
    location: "Kathmandu",
    education: "M.Sc Counseling Psychology",
    hours: "9 AM – 7 PM",
    fees: "Depends",
    bio: "Sara Shrestha provides client-centered therapy with a focus on emotional healing and personal growth."
  }
};

const Viewmore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const professional = professionalsData[id];

  if (!professional) {
    return <div>Professional not found</div>;
  }

  return (
    <div className="viewMoreWrapper">
      <DashboardNavbar />

      {/* Back Button */}
      <div className="viewMoreInner">
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Professional Detail
        </button>
      </div>

      {/* Hero Section */}
      <div className="proHero">
        <img src={professional.image} alt={professional.name} />
      </div>

      <div className="viewMoreInner">
        {/* Header */}
        <div className="proHeader">
          <h1>{professional.name}</h1>
          <p className="role">{professional.role}</p>
        </div>

        {/* Meta Info */}
        <div className="proMeta">
          <div className="metaItem">📍 {professional.location}</div>
          <div className="metaItem">⏰ {professional.hours}</div>
          <div className="metaItem">🎓 {professional.education}</div>
          <div className="metaItem">💰 {professional.fees}</div>
        </div>

        {/* About Section */}
        <div className="proSection">
          <h2>About</h2>
          <p>{professional.bio}</p>
        </div>

        {/* Action Button */}
        <button className="appointmentBtn">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Viewmore;

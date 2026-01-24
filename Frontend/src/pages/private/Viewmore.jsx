import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import axios from "axios";
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
    bio: "Dr. Reema Karki is an experienced psychologist specializing in anxiety, stress management, and emotional well-being. She believes in compassionate, evidence-based therapy.",
  },
  2: {
    name: "Dr. Rahul Shah",
    role: "Clinical Psychologist",
    image: "/images/profileimageboy.png",
    location: "Kathmandu",
    education: "M.Phil Clinical Psychology",
    hours: "10 AM – 5 PM",
    fees: "Rs. 1000 – 1500",
    bio: "Dr. Rahul Shah focuses on clinical assessments, therapy for depression, and long-term mental health care.",
  },
  3: {
    name: "Sara Shrestha",
    role: "Licensed Therapist",
    image: "/images/profileimage.png",
    location: "Kathmandu",
    education: "M.Sc Counseling Psychology",
    hours: "9 AM – 7 PM",
    fees: "Depends",
    bio: "Sara Shrestha provides client-centered therapy with a focus on emotional healing and personal growth.",
  },
};

const Viewmore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const professional = professionalsData[id];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  if (!professional) return <div>Professional not found</div>;

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();
    if (appointmentDateTime <= now) {
      alert("You cannot book an appointment in the past. Please select a future date and time.");
      return;
    }

    const payload = {
      professionalId: Number(id),
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      description: notes || "",
    };

    try {
      await axios.post(
        "http://localhost:3000/api/appointments",
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      alert("Appointment booked successfully!");
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
      setShowForm(false);
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="viewMoreWrapper">
      <DashboardNavbar />

      <div className="viewMoreInner">
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Professional Detail
        </button>
      </div>

      <div className="proHero">
        <img src={professional.image} alt={professional.name} />
      </div>

      <div className="viewMoreInner">
        <div className="proHeader">
          <h1>{professional.name}</h1>
          <p className="role">{professional.role}</p>
        </div>

        <div className="proMeta">
          <div className="metaItem">📍 {professional.location}</div>
          <div className="metaItem">⏰ {professional.hours}</div>
          <div className="metaItem">🎓 {professional.education}</div>
          <div className="metaItem">💰 {professional.fees}</div>
        </div>

        <div className="proSection">
          <h2>About</h2>
          <p>{professional.bio}</p>
        </div>

        <button className="appointmentBtn" onClick={() => setShowForm(true)}>
          Book Appointment
        </button>

        {showForm && (
          <div className="modalOverlay">
            <div className="modalContent">
              <h3>Book Appointment</h3>

              <label className="inputLabel">Appointment Date</label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <label className="inputLabel">Preferred Time</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />

              <label className="inputLabel">Notes (optional)</label>
              <textarea
                placeholder="Add any notes here"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className="formButtons">
                <button className="appointmentBtn bookBtn" onClick={handleBook}>
                  Book
                </button>
                <button
                  className="appointmentBtn cancelBtn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewmore;

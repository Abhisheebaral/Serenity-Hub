import React, { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/CalmMind.css";
import axios from "axios";

// Map of professionals — same as in Viewmore
const professionalsData = {
  1: {
    name: "Dr. Reema Karki",
    role: "Psychologist",
    image: "/images/profileimage.png",
    location: "Kathmandu, Lalitpur",
  },
  2: {
    name: "Dr. Rahul Shah",
    role: "Clinical Psychologist",
    image: "/images/profileimageboy.png",
    location: "Kathmandu",
  },
  3: {
    name: "Sara Shrestha",
    role: "Licensed Therapist",
    image: "/images/profileimage.png",
    location: "Kathmandu",
  },
};

const CalmMind = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [appointments, setAppointments] = useState([]);

  /* ---------------- FETCH APPOINTMENTS ---------------- */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Map backend response to match frontend structure and attach professional info
      const mapped = res.data.appointments.map((app) => {
        const dateTime = new Date(`${app.appointmentDate}T${app.appointmentTime}`);
        const now = new Date();
        const isPast = dateTime < now; // ✅ Check if appointment is past

        const professional = professionalsData[app.professionalId] || {};

        const day = dateTime.getDate();
        const month = dateTime.toLocaleString("default", { month: "short" }).toUpperCase();

        return {
          id: app.id,
          doctor: professional.name || "Unknown",
          role: professional.role || "Role not set",
          image: professional.image || "/images/profileimage.png",
          date: day,
          month: month,
          time: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: professional.location || "Online / Physical",
          status: app.status ? app.status : "Pending", // ✅ Fix for empty status
          type: isPast ? "past" : "scheduled", // ✅ Assign type based on date
        };
      });

      setAppointments(mapped);
    } catch (err) {
      console.error("Error fetching appointments:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Optional: show only confirmed upcoming sessions
  const filtered = appointments.filter(
    (app) => app.type === activeTab // keep as is, or add: && (activeTab !== "scheduled" || app.status === "Confirmed")
  );

  return (
    <div className="calmMindPage">
      <DashboardNavbar />

      {/* HERO SECTION */}
      <section className="calmHero">
        <p className="calmHeroSubtitle">Track your sessions</p>
      </section>

      {/* APPOINTMENTS */}
      <div className="calmContainer">
        <div className="calmTabs">
          <button
            className={`calmTab ${activeTab === "scheduled" ? "active" : ""}`}
            onClick={() => setActiveTab("scheduled")}
          >
            Upcoming Sessions <span className="countBadge">{filtered.length}</span>
          </button>
          <button
            className={`calmTab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Sessions
          </button>
        </div>

        <div className="appointmentList">
          {filtered.length > 0 ? (
            filtered.map((app) => (
              <div className="appointmentCard" key={app.id}>
                <div className="dateSquare">
                  <span className="dateDay">{app.date}</span>
                  <span className="dateMonth">{app.month}</span>
                </div>

                <div className="doctorInfo">
                  <div className="doctorHeader">
                    <img src={app.image} alt={app.doctor} className="miniAvatar" />
                    <div>
                      <h3>{app.doctor}</h3>
                      <p className="doctorRole">{app.role}</p>
                    </div>
                  </div>

                  <div className="appointmentMeta">
                    <span>🕒 {app.time}</span>
                    <span>📍 {app.location}</span>
                  </div>
                </div>

                <div className={`statusTag ${app.status.toLowerCase()}`}>
                  {app.status}
                </div>
              </div>
            ))
          ) : (
            <div className="emptyState">
              <p>No appointments found in this section.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalmMind;

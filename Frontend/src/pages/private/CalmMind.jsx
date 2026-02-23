import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/CalmMind.css";
import axios from "axios";

const CalmMind = () => {
  const [activeTab, setActiveTab] = useState("scheduled");
  const [appointments, setAppointments] = useState([]);

  const token = localStorage.getItem("token");

  /* Fetch appointments */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const mapped = res.data.appointments.map((app) => {

        const dateTime = new Date(
          `${app.appointmentDate}T${app.appointmentTime}`
        );

        const now = new Date();

        return {
          id: app.id,

          doctor: app.professional?.name || "Doctor",

          role: app.professional?.specialization || "",

          image:
            app.professional?.image ||
            "/images/profileimage.png",

          location:
            app.professional?.location ||
            "Online / Physical",

          date: dateTime.getDate(),

          month: dateTime
            .toLocaleString("default", { month: "short" })
            .toUpperCase(),

          time: dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),

          status: app.status || "Pending",

          type:
            dateTime.getTime() < now.getTime()
              ? "past"
              : "scheduled"
        };
      });

      setAppointments(mapped);

    } catch (err) {
      console.error("Fetch appointment error:", err);
    }
  };

  /* Auto refresh database every 5 seconds */
  useEffect(() => {

    fetchAppointments();

    const interval = setInterval(() => {
      fetchAppointments();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const filtered = appointments.filter(
    (app) => app.type === activeTab
  );

  return (
    <div className="calmMindPage">
      <DashboardNavbar />

      <section className="calmHero">
        <p className="calmHeroSubtitle">
          Track your sessions
        </p>
      </section>

      <div className="calmContainer">
        <div className="calmTabs">
          <button
            className={`calmTab ${
              activeTab === "scheduled" ? "active" : ""
            }`}
            onClick={() => setActiveTab("scheduled")}
          >
            Upcoming Sessions
            <span className="countBadge">
              {
                appointments.filter(
                  (a) => a.type === "scheduled"
                ).length
              }
            </span>
          </button>

          <button
            className={`calmTab ${
              activeTab === "past" ? "active" : ""
            }`}
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
                  <span className="dateDay">
                    {app.date}
                  </span>
                  <span className="dateMonth">
                    {app.month}
                  </span>
                </div>

                <div className="doctorInfo">
                  <div className="doctorHeader">
                    <img
                      src={app.image}
                      alt={app.doctor}
                      className="miniAvatar"
                    />

                    <div>
                      <h3>{app.doctor}</h3>
                      <p className="doctorRole">
                        {app.role}
                      </p>
                    </div>
                  </div>

                  <div className="appointmentMeta">
                    <span>🕒 {app.time}</span>
                    <span>📍 {app.location}</span>
                  </div>
                </div>

                <div
                  className={`statusTag ${app.status.toLowerCase()}`}
                >
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
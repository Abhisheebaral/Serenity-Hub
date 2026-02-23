import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import axios from "axios";
import "../../style/Viewmore.css";

const Viewmore = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [professional, setProfessional] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  /* Fetch professional detail */
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/professionals/${id}`
        );

        setProfessional(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load professional detail");
      }
    };

    fetchProfessional();
  }, [id]);

  if (!professional) return <div>Loading professional...</div>;

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const now = new Date();

    if (appointmentDateTime <= now) {
      alert("You cannot book an appointment in the past.");
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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Appointment booked successfully!");

      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
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
        <img src={professional.image || "/images/profileimage.png"} alt="" />
      </div>

      <div className="viewMoreInner">
        <div className="proHeader">
          <h1>{professional.name}</h1>
          <p className="role">{professional.specialization}</p>
        </div>

        <div className="proMeta">
          <div className="metaItem">📍 {professional.location}</div>
          <div className="metaItem">⏰ {professional.officeHours}</div>
          <div className="metaItem">🎓 {professional.education}</div>
          <div className="metaItem">💰 {professional.fees}</div>
        </div>

        <div className="proSection">
          <h2>About</h2>
          <p>{professional.bio || "No biography available."}</p>
        </div>

        <button
          className="appointmentBtn"
          onClick={() => setShowForm(true)}
        >
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
                <button
                  className="appointmentBtn bookBtn"
                  onClick={handleBook}
                >
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
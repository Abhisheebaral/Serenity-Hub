import React, { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/Dashboard.css";
import { TrendingUp, Award, Target } from "lucide-react"; // Calendar removed
import axios from "axios";

const Dashboard = () => {
  const [checkin, setCheckin] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCheckin = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/checkin/today", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCheckin(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckin();
    const interval = setInterval(fetchCheckin, 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!checkin) return <p>Failed to load check-in</p>;

  const saveCheckin = async (updatedCheckin) => {
    try {
      const { data } = await axios.patch(
        "http://localhost:3000/api/checkin/today",
        updatedCheckin,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCheckin(data);
    } catch (err) {
      console.error("Failed to save check-in:", err);
    }
  };

  const updateField = (field, value) => {
    if (["sleepMinutes", "exerciseMinutes", "meditationMinutes"].includes(field)) {
      if (value < 0) value = 0;
    }

    let updatedCheckin = { ...checkin };

    if (field === "sleepMinutes") {
      updatedCheckin.sleepMinutes = value * 60;
    } else {
      updatedCheckin[field] = value;
    }

    setCheckin(updatedCheckin);
    saveCheckin(updatedCheckin);
  };

  const moods = [
    { emoji: "🌧️", label: "Very Low", value: 1 },
    { emoji: "☁️", label: "Low", value: 2 },
    { emoji: "🌤️", label: "Okay", value: 3 },
    { emoji: "☀️", label: "Feeling Good", value: 4 },
    { emoji: "🌟", label: "Great", value: 5 },
  ];

  const quickChecks = [
    { field: "gratitude", label: "I practiced gratitude today" },
    { field: "connectedWithSomeone", label: "I connected with someone" },
    { field: "spentTimeOutside", label: "I spent time outside" },
    { field: "exercised", label: "I exercised or moved my body" },
    { field: "healthyMeals", label: "I ate healthy meals" },
  ];

  const calculateGoalsCompleted = () => {
    const total = quickChecks.length;
    const completed = quickChecks.filter(q => checkin[q.field]).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="dashboardPage">
      <DashboardNavbar />

      <div className="dashboardContent">
        <h1 className="dashboardTitle">🧠 Mental Health Dashboard</h1>
        <p className="dashboardSubtitle">Track your mental wellness journey and build healthy habits</p>

        {/* Stats Cards */}
        <div className="statsGrid">
          <div className="statCard">
            <TrendingUp className="statIcon green" />
            <p className="statLabel">Current Streak</p>
           <h2>{checkin.streak || 1} days</h2>

          </div>

          <div className="statCard" style={{ wordWrap: "break-word", overflow: "hidden", minHeight: "60px" }}>
            <p className="statIcon" style={{ fontSize: "2rem", margin: "0" }}>🧠</p>
            <p className="statLabel">Line of the Day</p>
            <h2 style={{ fontWeight: "normal", fontSize: "14px", lineHeight: "1.2em", maxHeight: "2.4em", overflow: "hidden" }}>
              {checkin.thoughtOfTheDay || "-"}
            </h2>
          </div>

          <div className="statCard">
            <Award className="statIcon purple" />
            <p className="statLabel">Average Mood</p>
            <h2>{checkin.mood || "-"}</h2>
          </div>

          <div className="statCard">
            <Target className="statIcon orange" />
            <p className="statLabel">Goals Completed</p>
            <h2>{calculateGoalsCompleted()}%</h2>
          </div>
        </div>

        {/* Mood Section */}
        <div className="card">
          <h3>How are you feeling today?</h3>
          <div className="moodRow">
            {moods.map((m) => (
              <span
                key={m.value}
                title={m.label}
                className={checkin.mood === m.value ? "selected" : ""}
                style={{
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  margin: "0 5px",
                  backgroundColor: checkin.mood === m.value ? "rgba(135, 206, 250, 0.3)" : "transparent",
                  borderRadius: "8px",
                  padding: "2px 4px",
                }}
                onClick={() => updateField("mood", m.value)}
              >
                {m.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottomGrid">
          <div className="card">
            <h3>Today's Wellness</h3>
            <div className="progressItem">
              <p>🌙 Sleep <span>{Math.floor(checkin.sleepMinutes / 60)}h</span></p>
              <input
                type="number"
                min={0}
                max={24}
                value={Math.floor(checkin.sleepMinutes / 60)}
                onChange={(e) => updateField("sleepMinutes", Number(e.target.value))}
              />
            </div>
            <div className="progressItem">
              <p>🏃 Exercise <span>{checkin.exerciseMinutes} min</span></p>
              <input
                type="number"
                min={0}
                max={230}
                value={checkin.exerciseMinutes}
                onChange={(e) => updateField("exerciseMinutes", Number(e.target.value))}
              />
            </div>
            <div className="progressItem">
              <p>🧘 Meditation <span>{checkin.meditationMinutes} min</span></p>
              <input
                type="number"
                min={0}
                max={230}
                value={checkin.meditationMinutes}
                onChange={(e) => updateField("meditationMinutes", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="card">
            <h3>✔ Quick Check-In</h3>
            {quickChecks.map((item) => (
              <label key={item.field} className="checkItem">
                <input
                  type="checkbox"
                  checked={checkin[item.field]}
                  onChange={(e) => updateField(item.field, e.target.checked)}
                />
                {item.label}
              </label>
            ))}
          </div>

          {/* Optional editable line */}
          <div className="card">
            <h3>💭 Line of the Day</h3>
            <textarea
              maxLength={80} // limit characters
              rows={3}
              value={checkin.thoughtOfTheDay || ""}
              placeholder="Write your line for today..."
              onChange={(e) => updateField("thoughtOfTheDay", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "none", // prevent resizing
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


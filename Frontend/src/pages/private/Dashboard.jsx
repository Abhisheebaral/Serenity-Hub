import React from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/Dashboard.css";
import { TrendingUp, Calendar, Award, Target } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="dashboardPage">
      <DashboardNavbar />

      <div className="dashboardContent">
        {/* Header */}
        <h1 className="dashboardTitle">🧠 Mental Health Dashboard</h1>
        <p className="dashboardSubtitle">
          Track your mental wellness journey and build healthy habits
        </p>

        {/* Stats Cards */}
        <div className="statsGrid">
          <div className="statCard">
            <TrendingUp className="statIcon green" />
            <p className="statLabel">Current Streak</p>
            <h2>12 days</h2>
          </div>

          <div className="statCard">
            <Calendar className="statIcon blue" />
            <p className="statLabel">Total Check-ins</p>
            <h2>45</h2>
          </div>

          <div className="statCard">
            <Award className="statIcon purple" />
            <p className="statLabel">Average Mood</p>
            <h2>4.1</h2>
          </div>

          <div className="statCard">
            <Target className="statIcon orange" />
            <p className="statLabel">Goals Completed</p>
            <h2>78%</h2>
          </div>
        </div>

        {/* Mood Section */}
        <div className="card">
          <h3>How are you feeling today?</h3>

          <div className="moodRow">
            <span title="Very Low">🌧️</span>
            <span title="Low">☁️</span>
            <span title="Okay">🌤️</span>

            <div className="moodSelected">
              ☀️
              <p>Feeling Good</p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottomGrid">
          {/* Wellness */}
          <div className="card">
            <h3>Today's Wellness</h3>

            <div className="progressItem">
              <p>🌙 Sleep <span>7 / 8 hrs</span></p>
              <div className="progressBar">
                <div style={{ width: "88%" }} />
              </div>
            </div>

            <div className="progressItem">
              <p>🏃 Exercise <span>45 / 60 min</span></p>
              <div className="progressBar">
                <div style={{ width: "75%" }} />
              </div>
            </div>

            <div className="progressItem">
              <p>🧘 Meditation <span>15 / 20 min</span></p>
              <div className="progressBar">
                <div style={{ width: "70%" }} />
              </div>
            </div>
          </div>

          {/* Quick Check-in */}
          <div className="card">
            <h3>✔ Quick Check-In</h3>

            <label className="checkItem checked">
              <input type="checkbox" defaultChecked />
              I practiced gratitude today
            </label>

            <label className="checkItem">
              <input type="checkbox" />
              I connected with someone
            </label>

            <label className="checkItem">
              <input type="checkbox" />
              I spent time outside
            </label>

            <label className="checkItem checked">
              <input type="checkbox" defaultChecked />
              I exercised or moved my body
            </label>

            <label className="checkItem">
              <input type="checkbox" />
              I ate healthy meals
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

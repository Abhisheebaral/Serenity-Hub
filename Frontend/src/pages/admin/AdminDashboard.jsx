import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../../components/AdminNav";
import { Users, CalendarCheck } from "lucide-react";
import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyUser, setHistoryUser] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:3000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  if (loading)
    return (
      <div className="adminSpinnerWrapper">
        <div className="adminSpinner"></div>
      </div>
    );

  const handleDelete = async (id, role) => {
    if (role === "admin") return;
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleViewHistory = async (user) => {
    setHistoryUser(user);
    setHistoryLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/user/${user.id}/checkins`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCheckins(res.data.checkins || []);
    } catch (err) {
      console.error(err);
      setCheckins([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = { 1: "😞", 2: "😕", 3: "😐", 4: "🙂", 5: "😄" };
    return moods[mood] || "😐";
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a.customerRole === "admin") return 1;
    if (b.customerRole === "admin") return -1;
    return a.id - b.id;
  });

  const Stats = ({ stats }) => {
    if (!stats) return null;
    return (
      <div className="statsGrid">
        <div className="statCard">
          <Users className="statIcon green" />
          <p className="statLabel">Total Users</p>
          <h2>{stats.totalCustomers}</h2>
        </div>
        <div className="statCard">
          <CalendarCheck className="statIcon purple" />
          <p className="statLabel">Appointments Today</p>
          <h2>{stats.todayAppointments}</h2>
        </div>
      </div>
    );
  };

  const CustomersTable = ({ users }) => {
    return (
      <div className="card">
        <h2>Users</h2>
        <div className="adminTableWrapper">
          <table className="adminTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.customerName}</td>
                  <td>{u.customerEmail}</td>
                  <td>{u.customerRole !== "admin" ? u.customerContactNo || "-" : "-"}</td>
                  <td>{u.customerRole}</td>
                  <td>
                    {u.customerRole !== "admin" && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="historyButton"
                          onClick={() => handleViewHistory(u)}
                        >
                          History
                        </button>
                        <button
                          className="deleteButton"
                          onClick={() => handleDelete(u.id, u.customerRole)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="adminDashboardPage">
      <AdminNav />
      <div className="adminDashboardContent fadeInLoaded">
        <h1 className="adminDashboardTitle">⚡ Admin Dashboard</h1>
        <p className="adminDashboardSubtitle">Manage Users</p>
        <Stats stats={stats} />
        <CustomersTable users={sortedUsers} />
      </div>

      {/* ===== HISTORY POPUP ===== */}
      {historyUser && (
        <div className="popupOverlay" onClick={() => setHistoryUser(null)}>
          <div className="popupBox" onClick={(e) => e.stopPropagation()}>
            <div className="popupHeader">
              <h3>📋 {historyUser.customerName}'s Goal History</h3>
              <button className="popupClose" onClick={() => setHistoryUser(null)}>✕</button>
            </div>

            {historyLoading ? (
              <div className="popupSpinner"><div className="adminSpinner"></div></div>
            ) : checkins.length === 0 ? (
              <p className="popupEmpty">No check-in history found for this user.</p>
            ) : (
              <div className="popupList">
                {checkins.map((c) => (
                  <div key={c.id} className="popupCard">
                    <div className="popupCardHeader">
                      <span className="popupDate">📅 {c.date}</span>
                      <span className="popupMood">{getMoodEmoji(c.mood)} Mood: {c.mood}/5</span>
                    </div>
                    <div className="popupGoals">
                      <span className={c.gratitude ? "goalTag done" : "goalTag missed"}>🙏 Gratitude</span>
                      <span className={c.exercised ? "goalTag done" : "goalTag missed"}>🏃 Exercise</span>
                      <span className={c.connectedWithSomeone ? "goalTag done" : "goalTag missed"}>🤝 Connected</span>
                      <span className={c.spentTimeOutside ? "goalTag done" : "goalTag missed"}>🌿 Outside</span>
                      <span className={c.healthyMeals ? "goalTag done" : "goalTag missed"}>🥗 Healthy Meals</span>
                    </div>
                    {c.thoughtOfTheDay && (
                      <p className="popupThought">💭 "{c.thoughtOfTheDay}"</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
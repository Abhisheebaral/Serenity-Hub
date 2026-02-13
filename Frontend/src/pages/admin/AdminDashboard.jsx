// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "../../components/AdminNav"; // Admin sidebar/nav
import { Users, CalendarCheck, TrendingUp, Target } from "lucide-react";
import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  /* ---------------- FETCH DASHBOARD DATA ---------------- */
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

  /* ---------------- DELETE USER ---------------- */
  const handleDelete = async (id, role) => {
    if (role === "admin") return; // extra safety
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      setUsers((prev) => prev.filter((u) => u.id !== id)); // remove deleted user from UI
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  /* ---------------- SORT USERS: ADMIN LAST ---------------- */
  const sortedUsers = [...users].sort((a, b) => {
    if (a.customerRole === "admin") return 1;
    if (b.customerRole === "admin") return -1;
    return a.id - b.id;
  });

  /* ---------------- STATS COMPONENT ---------------- */
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

        <div className="statCard">
          <TrendingUp className="statIcon orange" />
          <p className="statLabel">Active Users</p>
          <h2>{stats.activeUsers}</h2>
        </div>

        <div className="statCard">
          <Target className="statIcon blue" />
          <p className="statLabel">Pending Appointments</p>
          <h2>{stats.pendingAppointments}</h2>
        </div>
      </div>
    );
  };

  /* ---------------- CUSTOMERS TABLE COMPONENT ---------------- */
  const CustomersTable = ({ users }) => {
    return (
      <div className="card">
        <h2>Users</h2>
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
                {/* Only show phone for non-admin users */}
                <td>{u.customerRole !== "admin" ? u.customerContactNo || "-" : "-"}</td>
                <td>{u.customerRole}</td>
                <td>
                  {/* Show delete button only if not admin */}
                  {u.customerRole !== "admin" && (
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(u.id, u.customerRole)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default AdminDashboard;

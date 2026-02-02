import React, { useState, useEffect } from "react";
import AdminNav from "../../components/AdminNav"; // ✅ Admin Nav
import Stats from "./features/Stats";
import Customers from "./features/Customers";
import Appointments from "./features/Appointments";
import "../../style/AdminDashboard.css"; // ✅ Admin CSS

import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, apptsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:3000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:3000/api/admin/appointments", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setAppointments(apptsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdminData(); }, [token]);

  if (loading)
    return (
      <div className="adminSpinnerWrapper">
        <div className="adminSpinner"></div>
      </div>
    );

  return (
    <div className="adminDashboardPage">
      <AdminNav />
      <div className="adminDashboardContent fadeInLoaded">
        <h1 className="adminDashboardTitle">⚡ Admin Dashboard</h1>
        <p className="adminDashboardSubtitle">Manage customers and appointments</p>

        <Stats stats={stats} />
        <Customers users={users} />
        <Appointments appointments={appointments} />
      </div>
    </div>
  );
};

export default AdminDashboard;

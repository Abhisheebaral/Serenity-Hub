// src/pages/admin/features/Stats.jsx
import React from "react";
import { TrendingUp, Users, CalendarCheck, Target } from "lucide-react";

const Stats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="statsGrid">
      <div className="statCard">
        <Users className="statIcon green" />
        <p className="statLabel">Total Customers</p>
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

export default Stats;

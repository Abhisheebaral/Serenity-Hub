// src/pages/admin/features/Appointments.jsx
import React from "react";
import "../../../style/AdminDashboard.css";


const Appointments = ({ appointments }) => {
  return (
    <div className="adminCard" style={{ marginTop: "30px" }}>
      <h3 className="adminSectionTitle">All Appointments</h3>
      <div className="adminTableWrapper">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Professional</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.customerName}</td>
                <td>{a.professionalName}</td>
                <td>{a.appointmentDate}</td>
                <td>{a.appointmentTime}</td>
                <td>
                  <span className={`adminStatus ${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;

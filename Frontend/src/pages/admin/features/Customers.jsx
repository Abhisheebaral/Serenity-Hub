// src/pages/admin/features/Customers.jsx
import React from "react";

const Customers = ({ users }) => {
  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <h3>Customers List</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="dashboardTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.customerName}</td>
                <td>{u.customerEmail}</td>
                <td>{u.customerRole}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;

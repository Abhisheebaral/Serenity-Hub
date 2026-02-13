import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../components/AdminNav";
import "../../../style/Appointment.css";

// Map of professionals — same as frontend
const professionalsData = {
  1: "Dr. Reema Karki",
  2: "Dr. Rahul Shah",
  3: "Sara Shrestha",
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const token = localStorage.getItem("token");

  /* ---------------- FETCH APPOINTMENTS ---------------- */
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/admin/appointments",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const mapped = data.map((app, index) => ({
          ...app,
          serial: index + 1,
          customerName: app.customerName || `User ${app.customerId}`,
          professionalName:
            professionalsData[app.professionalId] ||
            `Professional ${app.professionalId}`,
          status: app.status || "Pending",
        }));

        setAppointments(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  /* ---------------- UPDATE APPOINTMENT STATUS ---------------- */
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error(`Error updating appointment:`, err.response?.data || err.message);
    }
  };

  /* ---------------- EDIT APPOINTMENT ---------------- */
  const startEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditForm({
      professionalId: appointment.professionalId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                professionalId: editForm.professionalId,
                professionalName:
                  professionalsData[editForm.professionalId] ||
                  `Professional ${editForm.professionalId}`,
                appointmentDate: editForm.appointmentDate,
                appointmentTime: editForm.appointmentTime,
                status: editForm.status,
              }
            : a
        )
      );
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (!appointments || appointments.length === 0) return <p>No appointments found</p>;

  return (
    <div className="adminDashboardPage">
      <AdminNav />
      <div className="adminDashboardContent">
        <h1 className="adminDashboardTitle">📅 All Appointments</h1>
        <p className="adminDashboardSubtitle">View and manage all appointments</p>

        <div className="adminCard adminTableWrapper">
          <table className="adminTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Professional</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.serial}</td>
                  <td>{a.customerName}</td>
                  <td>
                    {editingId === a.id ? (
                      <select
                        value={editForm.professionalId}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            professionalId: Number(e.target.value),
                          }))
                        }
                      >
                        {Object.entries(professionalsData).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      a.professionalName
                    )}
                  </td>
                  <td>
                    {editingId === a.id ? (
                      <input
                        type="date"
                        value={editForm.appointmentDate}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, appointmentDate: e.target.value }))
                        }
                      />
                    ) : (
                      a.appointmentDate
                    )}
                  </td>
                  <td>
                    {editingId === a.id ? (
                      <input
                        type="time"
                        value={editForm.appointmentTime}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, appointmentTime: e.target.value }))
                        }
                      />
                    ) : (
                      a.appointmentTime
                    )}
                  </td>
                  <td>{a.description || "-"}</td>
                  <td>
                    {editingId === a.id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm((prev) => ({ ...prev, status: e.target.value }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      a.status
                    )}
                  </td>
                  <td>
                    {editingId === a.id ? (
                      <>
                        <button onClick={() => saveEdit(a.id)} className="editButton">
                          Save
                        </button>
                        <button onClick={cancelEdit} className="cancelButton" style={{ marginLeft: "5px" }}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {a.status === "Pending" && (
                          <>
                            <button
                              className="approveButton"
                              onClick={() => updateStatus(a.id, "Confirmed")}
                            >
                              Approve
                            </button>
                            <button
                              className="denyButton"
                              onClick={() => updateStatus(a.id, "Cancelled")}
                              style={{ marginLeft: "5px" }}
                            >
                              Deny
                            </button>
                          </>
                        )}
                        <button
                          className="editButton"
                          onClick={() => startEdit(a)}
                          style={{ marginLeft: "5px" }}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../components/AdminNav";
import "../../../style/Appointment.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [originalForm, setOriginalForm] = useState({});
  const [professionalsMap, setProfessionalsMap] = useState({});
  const token = localStorage.getItem("token");

  const isPast = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime < new Date();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [appointmentRes, professionalRes] = await Promise.all([
          axios.get("http://localhost:3000/api/admin/appointments", { headers }),
          axios.get("http://localhost:3000/api/admin/professionals", { headers })
        ]);

        const map = {};
        professionalRes.data.forEach(pro => { map[pro.id] = pro.name; });
        setProfessionalsMap(map);

        const mapped = appointmentRes.data.appointments.map((app, index) => ({
          id: app.id,
          serial: index + 1,
          customerName: app.customerName || `User ${app.customerId}`,
          professionalId: app.professional?.id || app.professionalId,
          professionalName: app.professional?.name || map[app.professionalId] || `Professional ${app.professionalId}`,
          appointmentDate: app.appointmentDate,
          appointmentTime: app.appointmentTime,
          description: app.description || "-",
          status: app.status || "Pending"
        }));

        setAppointments(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  const startEdit = (appointment) => {
    setEditingId(appointment.id);
    const form = {
      professionalId: appointment.professionalId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status
    };
    setEditForm(form);
    setOriginalForm(form);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setOriginalForm({});
  };

  const saveEdit = async (id) => {
    try {
      // ✅ Auto set Rescheduled if date or time changed
      const dateChanged = editForm.appointmentDate !== originalForm.appointmentDate;
      const timeChanged = editForm.appointmentTime !== originalForm.appointmentTime;

      const finalForm = {
        ...editForm,
        status: dateChanged || timeChanged ? "Rescheduled" : editForm.status
      };

      await axios.patch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        finalForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, ...finalForm } : a)
      );
      setEditingId(null);
      setEditForm({});
      setOriginalForm({});
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const getStatusBadge = (status, date, time) => {
    if (isPast(date, time)) return "statusBadge completed";
    const map = {
      Confirmed: "statusBadge confirmed",
      Pending: "statusBadge pending",
      Cancelled: "statusBadge cancelled",
      Rescheduled: "statusBadge rescheduled"
    };
    return map[status] || "statusBadge pending";
  };

  const getStatusLabel = (status, date, time) => {
    if (isPast(date, time)) return "Completed";
    return status;
  };

  if (loading) return (
    <div className="adminSpinnerWrapper">
      <div className="adminSpinner"></div>
    </div>
  );

  if (!appointments.length) return (
    <div className="adminDashboardPage">
      <AdminNav />
      <div className="adminDashboardContent">
        <p>No appointments found</p>
      </div>
    </div>
  );

  return (
    <div className="adminDashboardPage">
      <AdminNav />
      <div className="adminDashboardContent">
        <h1 className="adminDashboardTitle">📅 All Appointments</h1>
        <p className="adminDashboardSubtitle">View and manage appointments</p>

        <div className="appointmentCard">
          <div className="appointmentTableWrapper">
            <table className="appointmentTable">
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
                {appointments.map(a => {
                  const past = isPast(a.appointmentDate, a.appointmentTime);

                  return (
                    <tr key={a.id}>
                      <td>{a.serial}</td>
                      <td>{a.customerName}</td>

                      <td>
                        {editingId === a.id ? (
                          <select
                            value={editForm.professionalId || ""}
                            onChange={e => setEditForm(prev => ({ ...prev, professionalId: Number(e.target.value) }))}
                          >
                            {Object.entries(professionalsMap).map(([id, name]) => (
                              <option key={id} value={id}>{name}</option>
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
                            value={editForm.appointmentDate || ""}
                            onChange={e => setEditForm(prev => ({ ...prev, appointmentDate: e.target.value }))}
                          />
                        ) : (
                          a.appointmentDate
                        )}
                      </td>

                      <td>
                        {editingId === a.id ? (
                          <input
                            type="time"
                            value={editForm.appointmentTime || ""}
                            onChange={e => setEditForm(prev => ({ ...prev, appointmentTime: e.target.value }))}
                          />
                        ) : (
                          a.appointmentTime
                        )}
                      </td>

                      <td>{a.description}</td>

                      <td>
                        {editingId === a.id ? (
                          <select
                            value={editForm.status || "Pending"}
                            onChange={e => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Rescheduled">Rescheduled</option>
                          </select>
                        ) : (
                          <span className={getStatusBadge(a.status, a.appointmentDate, a.appointmentTime)}>
                            {getStatusLabel(a.status, a.appointmentDate, a.appointmentTime)}
                          </span>
                        )}
                      </td>

                      <td>
                        {past ? (
                          <span className="noActions">—</span>
                        ) : editingId === a.id ? (
                          <div className="actionButtons">
                            <button className="saveButton" onClick={() => saveEdit(a.id)}>
                              ✓ Save
                            </button>
                            <button className="cancelButton" onClick={cancelEdit}>
                              ✕ Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="actionButtons">
                            <button className="approveButton" onClick={() => updateStatus(a.id, "Confirmed")}>
                              ✓ Approve
                            </button>
                            <button className="editButton" onClick={() => startEdit(a)}>
                              ✎ Edit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../components/AdminNav";
import "../../../style/Appointment.css";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [professionalsMap, setProfessionalsMap] = useState({});

  const token = localStorage.getItem("token");

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [appointmentRes, professionalRes] = await Promise.all([

          axios.get(
            "http://localhost:3000/api/admin/appointments",
            { headers }
          ),

          axios.get(
            "http://localhost:3000/api/admin/professionals",
            { headers }
          )

        ]);

        /* Map professionals */
        const map = {};
        professionalRes.data.forEach(pro => {
          map[pro.id] = pro.name;
        });

        setProfessionalsMap(map);

        /* Map appointments */
        const mapped = appointmentRes.data.appointments.map((app, index) => ({
          id: app.id,
          serial: index + 1,

          customerName: app.customerName || `User ${app.customerId}`,

          professionalId: app.professional?.id || app.professionalId,

          professionalName:
            app.professional?.name ||
            map[app.professionalId] ||
            `Professional ${app.professionalId}`,

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

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {

    try {

      await axios.patch(
        `http://localhost:3000/api/admin/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAppointments(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status } : a
        )
      );

    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  /* ================= EDIT LOGIC ================= */

  const startEdit = (appointment) => {

    setEditingId(appointment.id);

    setEditForm({
      professionalId: appointment.professionalId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status
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
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAppointments(prev =>
        prev.map(a =>
          a.id === id
            ? {
                ...a,
                ...editForm,
                professionalName:
                  professionalsMap[editForm.professionalId]
              }
            : a
        )
      );

      setEditingId(null);
      setEditForm({});

    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  /* ================= RENDER ================= */

  if (loading) return <p>Loading appointments...</p>;

  if (!appointments.length)
    return <p>No appointments found</p>;

  return (
    <div className="adminDashboardPage">

      <AdminNav />

      <div className="adminDashboardContent">

        <h1 className="adminDashboardTitle">📅 All Appointments</h1>
        <p className="adminDashboardSubtitle">
          View and manage appointments
        </p>

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

              {appointments.map(a => (

                <tr key={a.id}>

                  <td>{a.serial}</td>
                  <td>{a.customerName}</td>

                  <td>
                    {editingId === a.id ? (

                      <select
                        value={editForm.professionalId || ""}
                        onChange={e =>
                          setEditForm(prev => ({
                            ...prev,
                            professionalId: Number(e.target.value)
                          }))
                        }
                      >
                        {Object.entries(professionalsMap).map(([id, name]) => (
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
                        value={editForm.appointmentDate || ""}
                        onChange={e =>
                          setEditForm(prev => ({
                            ...prev,
                            appointmentDate: e.target.value
                          }))
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
                        value={editForm.appointmentTime || ""}
                        onChange={e =>
                          setEditForm(prev => ({
                            ...prev,
                            appointmentTime: e.target.value
                          }))
                        }
                      />

                    ) : (
                      a.appointmentTime
                    )}
                  </td>

                  <td>{a.description}</td>

                  <td>{a.status}</td>

                  <td>

                    {editingId === a.id ? (

                      <>
                        <button
                          className="editButton"
                          onClick={() => saveEdit(a.id)}
                        >
                          Save
                        </button>

                        <button
                          className="cancelButton"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>

                    ) : (

                      <>
                        <button
                          className="approveButton"
                          onClick={() => updateStatus(a.id, "Confirmed")}
                        >
                          Approve
                        </button>

                        <button
                          className="editButton"
                          onClick={() => startEdit(a)}
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
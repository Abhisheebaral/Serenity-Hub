import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import axios from "axios";
import "../../../style/ManageProfessionals.css";

const ManageProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [editingPro, setEditingPro] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* Fetch professionals */
  const fetchProfessionals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/professionals",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProfessionals(res.data);
    } catch {
      alert("Failed to load professionals");
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  /* Delete Professional */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this professional?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/professionals/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchProfessionals();
    } catch {
      alert("Delete failed");
    }
  };

  /* Edit Click */
  const handleEditClick = (pro) => {
    setEditingPro(pro);

    setEditForm({
      name: pro.name || "",
      specialization: pro.specialization || "",
      location: pro.location || "",
      education: pro.education || "",
      officeHours: pro.officeHours || "",
      fees: pro.fees || "",
      bio: pro.bio || "",
      image: pro.image || ""
    });
  };

  /* Input Change */
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  /* Update Professional */
  const handleUpdate = async () => {
    if (!editingPro) return;

    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:3000/api/admin/professionals/${editingPro.id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Professional updated successfully");

      setEditingPro(null);
      fetchProfessionals();

    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNav />

      <div className="manageContainer">
        <h2>Manage Psychiatrists</h2>

        <div className="manageGrid">
          {professionals.map((pro) => (
            <div key={pro.id} className="manageCard">
              <img
                src={pro.image || "/images/profileimage.png"}
                alt=""
              />

              <h3>{pro.name}</h3>
              <p>{pro.specialization}</p>

              <div className="manageButtons">
                <button
                  className="editBtn"
                  onClick={() => handleEditClick(pro)}
                >
                  Edit
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(pro.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingPro && (
        <div className="modalOverlay">
          <div className="modalBox">

            <h3>Edit Professional</h3>

            <input
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditChange}
            />

            <input
              name="specialization"
              placeholder="Specialization"
              value={editForm.specialization}
              onChange={handleEditChange}
            />

            <input
              name="location"
              placeholder="Location"
              value={editForm.location}
              onChange={handleEditChange}
            />

            <input
              name="education"
              placeholder="Education"
              value={editForm.education}
              onChange={handleEditChange}
            />

            <input
              name="officeHours"
              placeholder="Office Hours"
              value={editForm.officeHours}
              onChange={handleEditChange}
            />

            <input
              name="fees"
              type="number"
              placeholder="Fees"
              value={editForm.fees}
              onChange={handleEditChange}
            />

            <textarea
              name="bio"
              placeholder="Bio"
              value={editForm.bio}
              onChange={handleEditChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={editForm.image}
              onChange={handleEditChange}
            />

            <div className="modalButtons">

              <button
                onClick={handleUpdate}
                className="editBtn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditingPro(null)}
                className="deleteBtn"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProfessionals;
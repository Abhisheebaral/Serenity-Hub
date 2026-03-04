import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import axios from "axios";
import "../../../style/ManageProfessionals.css";

const ManageProfessionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [editingPro, setEditingPro] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProfessionals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/professionals",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfessionals(res.data);
    } catch {
      alert("Failed to load professionals");
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this professional?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/professionals/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProfessionals();
    } catch {
      alert("Delete failed");
    }
  };

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
    setImagePreview(getImageSrc(pro.image));
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:3000/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setEditForm((prev) => ({ ...prev, image: data.imageUrl }));
      } else {
        alert("Image upload failed: " + data.message);
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingPro) return;
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3000/api/admin/professionals/${editingPro.id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Professional updated successfully");
      setEditingPro(null);
      setImagePreview(null);
      fetchProfessionals();
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return "/images/profileimage.png";
    if (image.startsWith("http")) return image;
    return `http://localhost:3000${image}`;
  };

  return (
    <>
      <AdminNav />
      <div className="manageContainer">
        <h2>Manage Psychiatrists</h2>
        <div className="manageGrid">
          {professionals.map((pro) => (
            <div key={pro.id} className="manageCard">
              <img src={getImageSrc(pro.image)} alt="" />
              <h3>{pro.name}</h3>
              <p>{pro.specialization}</p>
              <div className="manageButtons">
                <button className="editBtn" onClick={() => handleEditClick(pro)}>Edit</button>
                <button className="deleteBtn" onClick={() => handleDelete(pro.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPro && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h3>Edit Professional</h3>

            <input name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} />
            <input name="specialization" placeholder="Specialization" value={editForm.specialization} onChange={handleEditChange} />
            <input name="location" placeholder="Location" value={editForm.location} onChange={handleEditChange} />
            <input name="education" placeholder="Education" value={editForm.education} onChange={handleEditChange} />
            <input name="officeHours" placeholder="Office Hours" value={editForm.officeHours} onChange={handleEditChange} />
            <input name="fees" type="number" placeholder="Fees" value={editForm.fees} onChange={handleEditChange} />
            <textarea name="bio" placeholder="Bio" value={editForm.bio} onChange={handleEditChange} />

            {/* ✅ Image Upload */}
            <label className="fileUploadLabel">
              📁 Change Profile Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
            {uploading && <p style={{ fontSize: "12px", color: "#64748b" }}>Uploading image...</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginTop: "8px",
                  border: "2px solid #0b4ec3"
                }}
              />
            )}

            <div className="modalButtons">
              <button onClick={handleUpdate} className="editBtn" disabled={loading || uploading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={() => { setEditingPro(null); setImagePreview(null); }} className="deleteBtn">
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
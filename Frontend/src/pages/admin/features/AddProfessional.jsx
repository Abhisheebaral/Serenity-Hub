import React, { useState } from "react";
import { addProfessional } from "../../../utils/api";
import AdminNav from "../../../components/AdminNav";
import "../../../style/AddProfessional.css";

const AddProfessional = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    location: "",
    education: "",
    officeHours: "",
    fees: "",
    bio: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.education.trim()) newErrors.education = "Education is required";
    if (!form.officeHours.trim()) newErrors.officeHours = "Office hours are required";
    if (!form.fees) newErrors.fees = "Fees are required";
    if (!form.bio.trim()) newErrors.bio = "Bio is required";
    if (!form.image) newErrors.image = "Please upload a profile image";
    return newErrors;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    setErrors({ ...errors, image: "" });

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.imageUrl }));
      } else {
        alert("Image upload failed: " + data.message);
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const res = await addProfessional({
      ...form,
      fees: Number(form.fees)
    });

    setLoading(false);

    if (res.success) {
      alert("Professional added successfully!");
      setForm({
        name: "",
        specialization: "",
        location: "",
        education: "",
        officeHours: "",
        fees: "",
        bio: "",
        image: ""
      });
      setImagePreview(null);
      setErrors({});
    } else {
      alert(res.message || "Failed to add professional");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="addProfessionalContainer">
        <h2>Add Professional</h2>
        <form onSubmit={handleSubmit} className="addProfessionalForm">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="errorText">{errors.name}</p>}

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
          />
          {errors.specialization && <p className="errorText">{errors.specialization}</p>}

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
          {errors.location && <p className="errorText">{errors.location}</p>}

          <input
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
          />
          {errors.education && <p className="errorText">{errors.education}</p>}

          <input
            name="officeHours"
            placeholder="Office Hours"
            value={form.officeHours}
            onChange={handleChange}
          />
          {errors.officeHours && <p className="errorText">{errors.officeHours}</p>}

          <input
            name="fees"
            type="number"
            placeholder="Fees"
            value={form.fees}
            onChange={handleChange}
          />
          {errors.fees && <p className="errorText">{errors.fees}</p>}

          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
          />
          {errors.bio && <p className="errorText">{errors.bio}</p>}

          {/* Image Upload */}
          <label className="fileUploadLabel">
            📁 Choose Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {errors.image && <p className="errorText">{errors.image}</p>}
          {uploading && <p>Uploading image...</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "8px"
              }}
            />
          )}

          <button type="submit" disabled={loading || uploading}>
            {loading ? "Adding..." : "Add Professional"}
          </button>

        </form>
      </div>
    </>
  );
};

export default AddProfessional;
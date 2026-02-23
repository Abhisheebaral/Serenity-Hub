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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
            required
          />

          <input
            name="officeHours"
            placeholder="Office Hours"
            value={form.officeHours}
            onChange={handleChange}
            required
          />

          <input
            name="fees"
            type="number"
            placeholder="Fees"
            value={form.fees}
            onChange={handleChange}
            required
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Professional"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProfessional;
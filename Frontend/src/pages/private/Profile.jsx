import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";
import "../../style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    memberSince: "",
  });

  const [editing, setEditing] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const profile = res.data.profile;
        setUser({
          fullName: profile.fullName,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          bio: profile.bio || "",
          memberSince: profile.memberSince,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch profile data");
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone input: only digits, max 10
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setUser({ ...user, phone: digitsOnly });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone validation
    if (user.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/api/profile",
        {
          fullName: user.fullName,
          phone: user.phone,
          bio: user.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page-wrapper">
      <DashboardNavbar />

      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-logo">
          <div className="leaf-icon">🍃</div>
          <div className="brand-text">
            <h1>
              Serenity<span>Hub</span>
            </h1>
            <p>Mental Wellness</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {/* Top Summary Card */}
        <div className="profile-card hero-section">
          <div className="avatar-wrapper">
            <div className="initials-avatar">
              {user.fullName ? user.fullName.charAt(0) : "U"}
            </div>
            <button className="camera-overlay">
              <span role="img" aria-label="camera">
                📷
              </span>
            </button>
          </div>

          <p className="display-username">@{user.username}</p>
          <p className="member-date">
            Member since {user.memberSince.split("T")[0]}
          </p>

          <button
            className="edit-profile-btn"
            onClick={() => setEditing(!editing)}
          >
            <span className="edit-icon">✎</span>{" "}
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Details Card */}
        <div className="profile-card details-section">
          <h3>Personal Information</h3>

          <form onSubmit={handleSubmit}>
            <div className="info-grid">
              {/* Full Name */}
              <div className="info-row">
                <label>👤 Full Name</label>
                {editing ? (
                  <input
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <p>{user.fullName}</p>
                )}
              </div>

              {/* Username (read-only) */}
              <div className="info-row">
                <label>@ Username</label>
                <p>{user.username}</p>
              </div>

              {/* Email (read-only, displayed as text) */}
              <div className="info-row">
                <label>✉ Email Address</label>
                <p>{user.email}</p>
              </div>

              {/* Phone */}
              <div className="info-row">
                <label>📞 Phone Number</label>
                {editing ? (
                  <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                ) : (
                  <p>{user.phone}</p>
                )}
              </div>

              {/* Bio */}
              <div className="info-row bio">
                <label>Bio</label>
                {editing ? (
                  <textarea
                    name="bio"
                    value={user.bio}
                    onChange={handleChange}
                    rows={4}
                  ></textarea>
                ) : (
                  <p className="bio-content">{user.bio}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            {editing && <button type="submit">Save Profile</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

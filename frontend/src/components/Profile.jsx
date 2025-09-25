import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (!stored) {
      navigate("/login");
      return;
    }
    const { userId } = JSON.parse(stored);
    if (!userId) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const data = await api(`/users/${userId}`);
        setUser(data);
        // Format DOB for date input (expects YYYY-MM-DD)
        const formatDateForInput = (dateString) => {
          if (!dateString) return "";
          try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0]; // YYYY-MM-DD
          } catch {
            return "";
          }
        };

        setFormData({
          Name: data.Name || "",
          DOB: formatDateForInput(data.DOB),
          Gender: data.Gender || "",
          ContactNo: data.ContactNo || "",
          Address: data.Address || "",
          AdmissionYear: data.AdmissionYear || "",
          CourseID: data.CourseID || "",
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  if (loading)
    return (
      <div className="profile-page">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-grid">
          <section className="profile-card">
            <div className="avatar-wrap">
              <div className="avatar skeleton-avatar" />
            </div>
            <div className="skeleton-text" style={{ width: 140, height: 18 }} />
            <div className="skeleton-text" style={{ width: 90, height: 14 }} />
            <div className="profile-meta">
              <div
                className="skeleton-text"
                style={{ width: 60, height: 12 }}
              />
              <div
                className="skeleton-text"
                style={{ width: 180, height: 12 }}
              />
              <div
                className="skeleton-text"
                style={{ width: 60, height: 12 }}
              />
              <div
                className="skeleton-text"
                style={{ width: 120, height: 12 }}
              />
            </div>
          </section>
          <section className="profile-details">
            <div
              className="skeleton-text"
              style={{ width: 160, height: 16, marginBottom: 12 }}
            />
            <div className="details-grid">
              {Array.from({ length: 5 }).map((_, i) => (
                <>
                  <div
                    className="skeleton-text"
                    style={{ width: 110, height: 12 }}
                  />
                  <div
                    className="skeleton-text"
                    style={{ width: 220, height: 12 }}
                  />
                </>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="auth-container">
        <div className="auth-card">{error}</div>
      </div>
    );
  if (!user) return null;

  async function handleSave() {
    setSaving(true);
    try {
      const { userId } = JSON.parse(localStorage.getItem("auth"));

      // Prepare data for sending
      const dataToSend = { ...formData };

      // Handle DOB - convert to proper format or null if empty
      if (dataToSend.DOB) {
        try {
          const date = new Date(dataToSend.DOB);
          if (isNaN(date.getTime())) {
            throw new Error("Invalid date");
          }
          // Keep the date as is if it's already in YYYY-MM-DD format
        } catch {
          delete dataToSend.DOB; // Remove invalid date
        }
      } else {
        dataToSend.DOB = null; // Explicitly set to null for empty dates
      }

      // Convert empty strings to null for numeric fields
      if (dataToSend.AdmissionYear === "") dataToSend.AdmissionYear = null;

      // Handle CourseID - keep as text, convert empty to null
      if (dataToSend.CourseID === "") dataToSend.CourseID = null;

      const updatedUser = await api(`/users/${userId}`, {
        method: "PUT",
        body: dataToSend,
      });
      setUser(updatedUser);
      setIsEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  function startEdit() {
    setIsEditing(true);

    // Format DOB for date input when entering edit mode
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        return date.toISOString().split("T")[0]; // YYYY-MM-DD
      } catch {
        return "";
      }
    };

    setFormData({
      Name: user.Name || "",
      DOB: formatDateForInput(user.DOB),
      Gender: user.Gender || "",
      ContactNo: user.ContactNo || "",
      Address: user.Address || "",
      AdmissionYear: user.AdmissionYear || "",
      CourseID: user.CourseID || "",
    });
  }

  function cancelEdit() {
    setIsEditing(false);
    setImagePreview(null);
    setProfileImage(null);
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
        {!isEditing ? (
          <button onClick={startEdit} className="edit-btn">
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button onClick={handleSave} disabled={saving} className="save-btn">
              {saving ? "Saving..." : "💾 Save"}
            </button>
            <button onClick={cancelEdit} className="cancel-btn">
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
      <div className="profile-grid">
        <section className="profile-card">
          <div className="avatar-wrap">
            <div className="avatar" aria-label="User avatar">
              {imagePreview || user.ImageUrl ? (
                <img src={imagePreview || user.ImageUrl} alt="Profile" />
              ) : (
                <div className="avatar-initials">
                  {(user.Name || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="avatar-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="avatar-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar-upload" className="upload-btn">
                  📷 Change Photo
                </label>
              </div>
            )}
          </div>
          <div className="profile-name">
            {isEditing ? (
              <input
                type="text"
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
                placeholder="Full Name"
                className="name-input"
              />
            ) : (
              user.Name || "User"
            )}
          </div>
          <div className="profile-role">{user.Role || "Student"}</div>
          <div className="profile-meta">
            <div>Email</div>
            <div>{user.Email || "-"}</div>
            <div>Contact</div>
            <div>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.ContactNo}
                  onChange={(e) =>
                    setFormData({ ...formData, ContactNo: e.target.value })
                  }
                  placeholder="Phone number"
                  className="contact-input"
                />
              ) : (
                user.ContactNo || "-"
              )}
            </div>
          </div>
        </section>
        <section className="profile-details">
          <h3>Bio & other details</h3>
          <div className="details-grid">
            <div className="dt">Course ID</div>
            <div className="dd">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.CourseID}
                  onChange={(e) =>
                    setFormData({ ...formData, CourseID: e.target.value })
                  }
                  placeholder="Course ID (e.g., CS101, BTECH-CSE)"
                />
              ) : (
                user.CourseID || "-"
              )}
            </div>
            <div className="dt">Admission Year</div>
            <div className="dd">
              {isEditing ? (
                <input
                  type="number"
                  value={formData.AdmissionYear}
                  onChange={(e) =>
                    setFormData({ ...formData, AdmissionYear: e.target.value })
                  }
                  placeholder="2023"
                  min="1990"
                  max="2030"
                />
              ) : (
                user.AdmissionYear || "-"
              )}
            </div>
            <div className="dt">Gender</div>
            <div className="dd">
              {isEditing ? (
                <select
                  value={formData.Gender}
                  onChange={(e) =>
                    setFormData({ ...formData, Gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                user.Gender || "-"
              )}
            </div>
            <div className="dt">DOB</div>
            <div className="dd">
              {isEditing ? (
                <input
                  type="date"
                  value={formData.DOB}
                  onChange={(e) =>
                    setFormData({ ...formData, DOB: e.target.value })
                  }
                />
              ) : user.DOB ? (
                new Date(user.DOB).toLocaleDateString()
              ) : (
                "-"
              )}
            </div>
            <div className="dt">Address</div>
            <div className="dd address-field">
              {isEditing ? (
                <textarea
                  value={formData.Address}
                  onChange={(e) =>
                    setFormData({ ...formData, Address: e.target.value })
                  }
                  placeholder="Enter your address"
                  rows={3}
                />
              ) : (
                user.Address || "-"
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

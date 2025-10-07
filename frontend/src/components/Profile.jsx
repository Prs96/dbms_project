import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../api/client";
import "../styles/Profile.css";

export default function Profile() {
  const { user: authUser, loading: authLoading } = useAuth();
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
    // Redirect to login if not authenticated
    if (!authLoading && !authUser) {
      navigate("/login");
      return;
    }

    async function load() {
      if (!authUser) return;

      try {
        const data = await api(`/users/${authUser.userId}`);
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
        console.error("Error loading profile:", e);
        // If API fails, use mock data from auth
        const mockProfile = {
          UserID: authUser.userId,
          Name: authUser.username || "User",
          Email: `${authUser.username}@college.edu`,
          DOB: null,
          Gender: "Not Specified",
          ContactNo: "Not Specified",
          Address: "Not Specified",
          AdmissionYear: new Date().getFullYear(),
          CourseID: "Not Assigned",
          Role: authUser.role,
        };
        setUser(mockProfile);
        setFormData({
          Name: mockProfile.Name,
          DOB: "",
          Gender: mockProfile.Gender,
          ContactNo: mockProfile.ContactNo,
          Address: mockProfile.Address,
          AdmissionYear: mockProfile.AdmissionYear,
          CourseID: mockProfile.CourseID,
        });
      } finally {
        setLoading(false);
      }
    }

    if (authUser) {
      load();
    }
  }, [authUser, authLoading, navigate]);

  if (loading)
    return (
      <div className="profile-page">
        <header className="profile-hero">
          <div>
            <p className="eyebrow">Account</p>
            <h1>Profile</h1>
            <p className="subtitle">
              We&apos;re fetching your latest information. Hang tight a second.
            </p>
          </div>
          <div className="hero-actions">
            <div className="btn btn-primary skeleton-btn" />
          </div>
        </header>
        <div className="profile-shell">
          <section className="profile-summary card">
            <div className="avatar-stack">
              <div className="avatar skeleton-avatar" />
              <div
                className="skeleton-text"
                style={{ width: 160, height: 22 }}
              />
              <div className="skeleton-pill" />
            </div>
            <div className="meta-list">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`summary-${i}`} className="meta-row">
                  <div
                    className="skeleton-text"
                    style={{ width: 70, height: 12 }}
                  />
                  <div
                    className="skeleton-text"
                    style={{ width: 150, height: 12 }}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="profile-details card">
            <div className="section-header">
              <div
                className="skeleton-text"
                style={{ width: 180, height: 18 }}
              />
              <div
                className="skeleton-text"
                style={{ width: 120, height: 12 }}
              />
            </div>
            <div className="details-grid">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`details-${i}`} className="detail-item">
                  <div
                    className="skeleton-text"
                    style={{ width: 100, height: 12 }}
                  />
                  <div
                    className="skeleton-text"
                    style={{ width: 220, height: 12 }}
                  />
                </div>
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
    if (!authUser) {
      setError("Not authenticated");
      return;
    }
    
    setSaving(true);
    try {
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

      const updatedUser = await api(`/users/${authUser.userId}`, {
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
      <header className="profile-hero">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Profile</h1>
          <p className="subtitle">
            Review and update the personal details connected to your College PIS
            account.
          </p>
        </div>
        {!isEditing ? (
          <button onClick={startEdit} className="btn btn-primary">
            Edit profile
          </button>
        ) : (
          <div className="hero-actions">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button onClick={cancelEdit} className="btn btn-ghost">
              Cancel
            </button>
          </div>
        )}
      </header>
      <div className="profile-shell">
        <section className="profile-summary card">
          <div className="avatar-stack">
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
                  Change photo
                </label>
              </div>
            )}
          </div>
          <div className="profile-heading">
            {isEditing ? (
              <input
                type="text"
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
                placeholder="Full name"
                className="name-input"
              />
            ) : (
              <h2>{user.Name || "User"}</h2>
            )}
            <span className="role-pill">{user.Role || "Student"}</span>
          </div>
          <div className="meta-list">
            <div className="meta-row">
              <span className="meta-label">Email</span>
              <span className="meta-value">{user.Email || "-"}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Contact</span>
              <span className="meta-value">
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
              </span>
            </div>
          </div>
        </section>
        <section className="profile-details card">
          <div className="section-header">
            <div>
              <h3>Personal details</h3>
              <p>
                Keep these details current so faculty can reach you quickly.
              </p>
            </div>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Course ID</span>
              <span className="detail-value">
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
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Admission year</span>
              <span className="detail-value">
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.AdmissionYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        AdmissionYear: e.target.value,
                      })
                    }
                    placeholder="2023"
                    min="1990"
                    max="2030"
                  />
                ) : (
                  user.AdmissionYear || "-"
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender</span>
              <span className="detail-value">
                {isEditing ? (
                  <select
                    value={formData.Gender}
                    onChange={(e) =>
                      setFormData({ ...formData, Gender: e.target.value })
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  user.Gender || "-"
                )}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of birth</span>
              <span className="detail-value">
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
              </span>
            </div>
            <div className="detail-item address-item">
              <span className="detail-label">Address</span>
              <span className="detail-value">
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
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

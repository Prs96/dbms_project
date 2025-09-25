import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:3000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        const res = await fetch(`${API_BASE}/users/${userId}`);
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setUser(data);
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

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-grid">
        <section className="profile-card">
          <div className="avatar-wrap">
            <div className="avatar" aria-label="User avatar">
              {!user.ImageUrl && (
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
          </div>
          <div className="profile-name">{user.Name || "User"}</div>
          <div className="profile-role">{user.Role || "Student"}</div>
          <div className="profile-meta">
            <div>Email</div>
            <div>{user.Email || "-"}</div>
            <div>Contact</div>
            <div>{user.ContactNo || "-"}</div>
          </div>
        </section>
        <section className="profile-details">
          <h3>Bio & other details</h3>
          <div className="details-grid">
            <div className="dt">Course ID</div>
            <div className="dd">{user.CourseID || "-"}</div>
            <div className="dt">Admission Year</div>
            <div className="dd">{user.AdmissionYear || "-"}</div>
            <div className="dt">Gender</div>
            <div className="dd">{user.Gender || "-"}</div>
            <div className="dt">DOB</div>
            <div className="dd">{user.DOB || "-"}</div>
            <div className="dt">Address</div>
            <div className="dd">{user.Address || "-"}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

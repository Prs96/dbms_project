import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/auth";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:3000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginRequest({ username, password });
      localStorage.setItem(
        "auth",
        JSON.stringify({ userId: data.userId, role: data.role })
      );
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign in</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="Enter your username"
            />
          </label>
          <label>
            Password
            <div className="input-with-icon">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                className="reveal-btn"
                aria-label="Show or hide password"
                onClick={() => setShowPwd((v) => !v)}
              >
                {showPwd ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.69-1.64 1.8-3.13 3.2-4.35M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8-.46 1.09-1.07 2.1-1.8 3" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="auth-alt">
          No account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}

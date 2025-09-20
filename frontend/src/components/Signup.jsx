import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:3000";

export default function Signup() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function getPasswordRules(pw) {
    return {
      len: pw.length >= 8,
      lower: /[a-z]/.test(pw),
      upper: /[A-Z]/.test(pw),
      number: /[0-9]/.test(pw),
    };
  }

  const pwdRules = getPasswordRules(password);
  const pwdScore = [
    pwdRules.len,
    pwdRules.lower,
    pwdRules.upper,
    pwdRules.number,
  ].filter(Boolean).length;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (
        !pwdRules.len ||
        !pwdRules.lower ||
        !pwdRules.upper ||
        !pwdRules.number
      ) {
        throw new Error(
          "Password must be at least 8 characters and include uppercase, lowercase, and a number."
        );
      }
      const resp = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
          role: "Student",
        }),
      });
      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.message || "Failed to sign up");
      }
      await resp.json();
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title ">Sign Up</h2>
        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@college.edu"
            />
          </label>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="janedoe"
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
            <div className={`password-meta`}>
              <div
                className={`strength-bar strength-${pwdScore}`}
                aria-label="Password strength"
                aria-live="polite"
              >
                <div className="strength-seg" />
                <div className="strength-seg" />
                <div className="strength-seg" />
                <div className="strength-seg" />
              </div>
              <div className="password-hint">
                Minimum 8 characters with uppercase, lowercase and a number
              </div>
            </div>
          </label>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>
        <p className="auth-alt">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

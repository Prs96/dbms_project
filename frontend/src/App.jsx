import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ThemeSwitch from "./components/ThemeSwitch";
import "./App.css";

function Shell({ children }) {
  useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const shouldLock =
      location.pathname === "/login" || location.pathname === "/signup";
    if (shouldLock) {
      const prevHtml = html.style.overflow;
      const prevBody = body.style.overflow;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      return () => {
        html.style.overflow = prevHtml;
        body.style.overflow = prevBody;
      };
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
  }, [location.pathname]);

  const onAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";
  const hasAuth = Boolean(localStorage.getItem("auth"));

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  }
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/profile" className="brand">
          College PIS
        </Link>
        <div className="spacer" />
        {!onAuthRoute && hasAuth && (
          <button className="logout-btn" onClick={handleLogout} title="Log out">
            Logout
          </button>
        )}
        <ThemeSwitch />
      </header>
      <main>{children}</main>
    </div>
  );
}

function RequireAuth({ children }) {
  const hasAuth = Boolean(localStorage.getItem("auth"));
  if (!hasAuth) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  );
}

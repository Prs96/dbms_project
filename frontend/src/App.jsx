import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ThemeSwitch from "./components/ThemeSwitch";
import "./App.css";

function Shell({ children }) {
  useTheme();
  const location = useLocation();

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
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/login" className="brand">
          College PIS
        </Link>
        <div className="spacer" />
        <ThemeSwitch />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  );
}

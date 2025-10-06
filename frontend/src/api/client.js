// Centralized API helper
// In production (Docker), use relative path so Nginx can proxy to backend
// In development, use localhost:3000
const BASE =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.MODE === "production" ? "" : "http://localhost:3000");

export async function api(path, options = {}) {
  const { method = "GET", body, headers } = options;
  const init = { method, headers: { ...(headers || {}) } };
  if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const url = (BASE.endsWith("/") ? BASE.slice(0, -1) : BASE) + path;
  const res = await fetch(url, init);
  let data = null;
  try {
    data = await res.json();
  } catch (_) {}
  if (!res.ok) {
    const msg = (data && data.message) || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export function getBaseUrl() {
  return BASE;
}

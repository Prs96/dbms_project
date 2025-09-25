import { api } from "./client";

export async function login({ username, password }) {
  return api("/auth/login", { method: "POST", body: { username, password } });
}

export async function signup({
  name,
  email,
  username,
  password,
  role = "Student",
}) {
  return api("/auth/signup", {
    method: "POST",
    body: { name, email, username, password, role },
  });
}

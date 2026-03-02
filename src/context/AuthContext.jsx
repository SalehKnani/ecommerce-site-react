// src/context/AuthContext.jsx
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch {
    return [];
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadUser());

  const isLoggedIn = !!user;

  function signUp(email, password) {
    const users = loadUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) return { success: false, error: "Email already exists" };

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    const nextUser = { email };
    setUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
    return { success: true };
  }

  function login(email, password) {
    const users = loadUsers();
    const ok = users.find((u) => u.email === email && u.password === password);
    if (!ok) return { success: false, error: "Invalid email or password" };

    const nextUser = { email };
    setUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value = useMemo(
    () => ({ user, isLoggedIn, signUp, login, logout }),
    [user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // 🔹 Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const savedEmail = localStorage.getItem("currentUserEmail");
    return savedEmail ? { email: savedEmail } : null;
  });

  // 🔹 SIGN UP
  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // check if email exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  }

  // 🔹 LOGIN
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }

  // 🔹 LOGOUT
  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
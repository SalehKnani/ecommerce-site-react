import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const [mode, setMode] = useState("signup");
  const { signUp, login, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // if user tried to go /checkout, send him back there after login
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const email = data.email.trim();
    const password = data.password;

    if (mode === "signup") {
      const result = signUp(email, password);
      if (!result?.success) {
        alert(result?.error || "Signup failed");
        return;
      }

      reset();
      navigate(from, { replace: true }); // ✅ redirect
      return;
    }

    const result = login(email, password);
    if (!result?.success) {
      alert(result?.error || "Login failed");
      return;
    }

    reset();
    navigate(from, { replace: true }); // ✅ redirect
  }

  // If already logged in and user goes to /auth manually → send home
  if (isLoggedIn) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          <h1 className="page-title">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => {
                    setMode("signin");
                    reset();
                  }}
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                New here?{" "}
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => {
                    setMode("signup");
                    reset();
                  }}
                >
                  Create account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
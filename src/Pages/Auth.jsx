import { useEffect, useMemo, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("signup"); // "signup" | "signin"
  const { signUp, login, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // if user tried to go /checkout, send him back there after login
  const from = useMemo(() => location.state?.from?.pathname || "/", [location.state]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn, navigate]);

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
      navigate(from, { replace: true });
      return;
    }

    const result = login(email, password);
    if (!result?.success) {
      alert(result?.error || "Login failed");
      return;
    }

    reset();
    navigate(from, { replace: true });
  }

  return (
    <div className="authPage">
      <div className="authShell">
        <div className="authCard">
          <div className="authHeader">
            <div className="authBadge">Lumino</div>
            <h1 className="authTitle">
              {mode === "signup" ? "Create account" : "Welcome back"}
            </h1>
            <p className="authSubtitle">
              {mode === "signup"
                ? "Sign up to start shopping and save your cart."
                : "Sign in to continue to your cart and checkout."}
            </p>
          </div>

          <div className="authTabs" role="tablist" aria-label="Auth mode">
            <button
              type="button"
              className={`authTab ${mode === "signup" ? "active" : ""}`}
              onClick={() => {
                setMode("signup");
                reset();
              }}
            >
              Sign up
            </button>
            <button
              type="button"
              className={`authTab ${mode === "signin" ? "active" : ""}`}
              onClick={() => {
                setMode("signin");
                reset();
              }}
            >
              Sign in
            </button>
          </div>

          <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className={`input ${errors.email ? "inputError" : ""}`}
                type="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                })}
              />
              {errors.email && <p className="errorText">{errors.email.message}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className={`input ${errors.password ? "inputError" : ""}`}
                type="password"
                id="password"
                placeholder="••••••••"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="errorText">{errors.password.message}</p>}
              <p className="hint">
                Use at least 6 characters.
              </p>
            </div>

            <button className="primaryBtn" type="submit" disabled={isSubmitting}>
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="authFooter">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="linkBtn"
                  onClick={() => {
                    setMode("signin");
                    reset();
                  }}
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                New here?{" "}
                <button
                  type="button"
                  className="linkBtn"
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

        <div className="authSide">
          <div className="sideCard">
            <h3 className="sideTitle">Why sign in?</h3>
            <ul className="sideList">
              <li>Cart saved to your account</li>
              <li>Faster checkout</li>
              <li>Simple local demo auth</li>
            </ul>
            <p className="sideHint">Tip: your cart is cleared on logout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
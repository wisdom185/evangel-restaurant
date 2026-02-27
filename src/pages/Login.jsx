// src/pages/Login.jsx
import { useState } from "react";
import { API_BASE } from "../api";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // simple auth: store token and tell App the user is logged in
      localStorage.setItem("authToken", data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Admin Login</h2>

        {error && <p className="login-error">{error}</p>}

        <label className="login-label">
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="login-input"
          />
        </label>

        <label className="login-label">
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="login-input"
          />
        </label>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%", marginTop: "12px" }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;


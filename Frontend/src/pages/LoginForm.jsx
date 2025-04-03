import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { username, password };

    try {
      // Sending a POST request to the backend login endpoint
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.status === 200) {
        // Login is successful
        alert("Login successful!");
        navigate("/profile", { state: { username } }); // Redirect to Profile page
      }
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container m-5 h-full">
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control1 text-dark"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="mt-5">
          Don't have an account? <Link to="/register" className="text-dark text-decoration-none">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

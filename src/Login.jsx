import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

   const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {

    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } 
    else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } 
    else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


 const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setMessage("");

  try {

    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email: email,
        password: password
      }
    );

    // Store JWT token
    console.log(response.data);
localStorage.setItem(
  "token",
  response.data.token
);

setMessage(response.data.message);
setIsSuccess(true);

// Decode role from token
const token = response.data.token;

const payload = JSON.parse(
  atob(token.split(".")[1])
);

const role = payload.role;

// Role-based redirect
setTimeout(() => {

  if (role === "admin") {

    navigate("/admin-dashboard");

  }
  else {

    navigate("/dashboard");

  }

}, 1000);

// Redirect to dashboard
setTimeout(() => {
  navigate("/dashboard");
}, 1000);
  } 
  catch (error) {

    setMessage(
      error.response?.data?.message ||
      "Server error"
    );

    setIsSuccess(false);

  } 
  finally {

    setLoading(false);

  }
};
  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleSubmit}>

        <h2>Login</h2>

        {/* Email */}
        <div className="form-group">

          <label>Email</label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />

          {errors.email && (
            <p className="error">{errors.email}</p>
          )}

        </div>

        {/* Password */}
        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          {errors.password && (
            <p className="error">{errors.password}</p>
          )}

        </div>

        {/* Button */}
        <button type="submit" disabled={loading}>

          {loading ? "Loading..." : "Login"}

        </button>

        {/* Message */}
        {message && (
          <p className={isSuccess ? "success" : "error"}>
            {message}
          </p>
        )}

      </form>

    </div>
  );
}

export default Login;
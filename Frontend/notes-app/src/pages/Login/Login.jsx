import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login data:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h4 className="login-title">Login</h4>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="login-footer">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
              <p className="signup-link">
                Don't have an account? <a href="/SignUp">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

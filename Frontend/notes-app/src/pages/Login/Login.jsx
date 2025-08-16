import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar_login_signup";
import PasswordInput from "../../Components/Inputs/PasswordInput";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace this with your actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Save authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Handle error response
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes - remove this in production
  const handleDemoLogin = () => {
    // Simulate successful login for demo
    localStorage.setItem('token', 'demo-token-12345');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Demo User',
      email: formData.email || 'demo@example.com'
    }));
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <h4 className="login-title">Login</h4>

            {error && (
              <div className="error-message" style={{
                color: 'red',
                backgroundColor: '#fee',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

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
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
                showValidation={false} // Set to true if you want password strength indicator
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Demo button - remove in production */}
            <button 
              type="button" 
              onClick={handleDemoLogin}
              className="demo-btn"
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Demo Login (Skip Authentication)
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
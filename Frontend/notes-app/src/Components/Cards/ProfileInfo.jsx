import React, { useState, useEffect, useRef } from "react";
import "./card.css";

const ProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = {
    name: "John William",
    email: "john.william@example.com",
    initials: "JW",
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
      closeDropdown();
    }
  };

  const menuItems = [
    { icon: "👤", label: "View Profile", action: () => alert("View Profile") },
    { icon: "⚙️", label: "Settings", action: () => alert("Settings") },
    { icon: "🎨", label: "Theme", action: () => alert("Theme Settings") },
    { icon: "💬", label: "Feedback", action: () => alert("Send Feedback") },
    { icon: "❓", label: "Help & Support", action: () => alert("Help Center") },
  ];
  /*
    const menuItems = [
  { icon: "👤", label: "View Profile", link: "/profile" },
  { icon: "⚙️", label: "Settings", link: "/settings" },
  { icon: "🎨", label: "Theme", link: "/theme" },
  { icon: "💬", label: "Feedback", link: "/feedback" },
  { icon: "❓", label: "Help & Support", link: "/help" }
];
  */

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button
        className={`profile-trigger ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="profile-avatar">{user.initials}</div>
        <span className="profile-name">{user.name.split(" ")[0]}</span>
        <svg
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="profile-dropdown">
          {/* User Header */}
          <div className="dropdown-header">
            <div className="profile-avatar large">{user.initials}</div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <div className="status-indicator"></div>
          </div>

          {/* Menu Items */}
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="menu-item"
                onClick={() => {
                  item.action();
                  closeDropdown();
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}

            {/* Divider */}
            <div className="divider"></div>

            {/* Logout Button */}
            <button className="menu-item logout" onClick={handleLogout}>
              <span className="menu-icon">🚪</span>
              <span className="menu-label">Logout</span>
            </button>
          </div>

          {/* Footer */}
          <div className="dropdown-footer">
            <div className="footer-text">
              Version 2.1.0 • Last login: Today at 2:30 PM
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

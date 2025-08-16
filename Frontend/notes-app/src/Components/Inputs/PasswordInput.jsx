import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const PasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter your password",
  name = "password",
  id = "password",
  required = false,
  disabled = false,
  showValidation = false,
  className = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password validation rules
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    const rules = {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    score = Object.values(rules).filter(Boolean).length;

    const strengthLevels = {
      0: { strength: 0, label: '', color: '' },
      1: { strength: 1, label: 'Very Weak', color: '#ef4444' },
      2: { strength: 2, label: 'Weak', color: '#f97316' },
      3: { strength: 3, label: 'Fair', color: '#eab308' },
      4: { strength: 4, label: 'Good', color: '#22c55e' },
      5: { strength: 5, label: 'Strong', color: '#16a34a' }
    };

    return strengthLevels[score];
  };

  const passwordStrength = showValidation ? getPasswordStrength(value) : null;

  return (
    <div className={`password-input-container ${className}`}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none disabled:cursor-not-allowed"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <MdVisibilityOff size={20} />
          ) : (
            <MdVisibility size={20} />
          )}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showValidation && value && (
        <div className="mt-2">
          {/* Strength Bar */}
          <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                  level <= passwordStrength.strength 
                    ? 'opacity-100' 
                    : 'opacity-30'
                }`}
                style={{
                  backgroundColor: level <= passwordStrength.strength 
                    ? passwordStrength.color 
                    : '#e5e7eb'
                }}
              />
            ))}
          </div>
          
          {/* Strength Label */}
          {passwordStrength.label && (
            <p 
              className="text-sm font-medium"
              style={{ color: passwordStrength.color }}
            >
              Password strength: {passwordStrength.label}
            </p>
          )}
          
          {/* Password Requirements */}
          <div className="mt-2 text-xs text-gray-600">
            <p className="mb-1">Password must contain:</p>
            <ul className="space-y-1">
              <li className={`flex items-center ${value.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-1">{value.length >= 8 ? '✓' : '×'}</span>
                At least 8 characters
              </li>
              <li className={`flex items-center ${/[A-Z]/.test(value) ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-1">{/[A-Z]/.test(value) ? '✓' : '×'}</span>
                One uppercase letter
              </li>
              <li className={`flex items-center ${/[a-z]/.test(value) ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-1">{/[a-z]/.test(value) ? '✓' : '×'}</span>
                One lowercase letter
              </li>
              <li className={`flex items-center ${/\d/.test(value) ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-1">{/\d/.test(value) ? '✓' : '×'}</span>
                One number
              </li>
              <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(value) ? 'text-green-600' : 'text-gray-500'}`}>
                <span className="mr-1">{/[!@#$%^&*(),.?":{}|<>]/.test(value) ? '✓' : '×'}</span>
                One special character
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
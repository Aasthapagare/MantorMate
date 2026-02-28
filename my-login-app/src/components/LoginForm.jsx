import React, { useState } from 'react';
import { loginUser } from '../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Email validation
  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return 'Invalid email format';
    }
    return '';
  };

  // Password validation
  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (value.length > 50) {
      return 'Password must not exceed 50 characters';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    setErrors({});
    setSuccessMessage('');
    setIsLoading(true);

    // Call login API (no role needed now)
    const response = await loginUser(email, password);

    setIsLoading(false);

    if (response.success) {
      setSuccessMessage(response.message);

      // Role will come from backend
      onLoginSuccess(
        response.data.userId,
        response.data.role,
        response.data.name
      );
    } else {
      setErrors({ submit: response.message });
    }
  };

  return (
    <div className="form-box login">
      <div className="form-content">
        <h1>Login</h1>

        {/* Email Input */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? 'input-error' : ''}
            required
          />
          <i className='bx bxs-envelope'></i>
        </div>
        {errors.email && (
          <span className="error-text">{errors.email}</span>
        )}

        {/* Password Input */}
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? 'input-error' : ''}
            required
          />
          <i
            className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div style={{
            color: '#e74c3c',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#fadbd8',
            borderRadius: '4px'
          }}>
            {errors.submit}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div style={{
            color: '#27ae60',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#d5f4e6',
            borderRadius: '4px'
          }}>
            {successMessage}
          </div>
        )}

        <div className="forgot-link">
          <a href="#" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        <button className="btn" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
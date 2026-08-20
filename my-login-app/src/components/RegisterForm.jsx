import React, { useState } from 'react';
import { registerUser } from '../services/authService';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Enrollment Number validation
  const validateEnrollmentNumber = (value) => {
    if (!value.trim()) {
      return 'Enrollment number is required';
    }
    if (value.length < 3) {
      return 'Enrollment number must be at least 3 characters';
    }
    if (value.length > 20) {
      return 'Enrollment number must not exceed 20 characters';
    }
    return '';
  };

  // Name validation
  const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (value.length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (value.length > 50) {
      return 'Name must not exceed 50 characters';
    }
    return '';
  };

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

  const handleEnrollmentNumberChange = (e) => {
    setEnrollmentNumber(e.target.value);
    if (errors.enrollmentNumber) {
      setErrors({ ...errors, enrollmentNumber: '' });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
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

    const enrollmentNumberError = validateEnrollmentNumber(enrollmentNumber);
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (enrollmentNumberError || nameError || emailError || passwordError) {
      setErrors({
        enrollmentNumber: enrollmentNumberError,
        name: nameError,
        email: emailError,
        password: passwordError
      });
      return;
    }

    setErrors({});
    setSuccessMessage('');
    setIsLoading(true);

    const response = await registerUser({
      enrollmentNumber,
      name,
      email,
      password
    });

    setIsLoading(false);

    if (response.success) {
      setSuccessMessage(response.message);
      // Call onRegisterSuccess to switch to login
      onRegisterSuccess();
    } else {
      setErrors({ submit: response.message });
    }
  };

  return (
    <div className="form-box register">
      <div className="form-content">
        <h1>Register</h1>

        {/* Enrollment Number Input */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Enrollment Number"
            value={enrollmentNumber}
            onChange={handleEnrollmentNumberChange}
            className={errors.enrollmentNumber ? 'input-error' : ''}
            required
          />
          <i className='bx bx-id-card'></i>
        </div>
        {errors.enrollmentNumber && (
          <span className="error-text">{errors.enrollmentNumber}</span>
        )}

        {/* Name Input */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={handleNameChange}
            className={errors.name ? 'input-error' : ''}
            required
          />
          <i className='bx bx-user'></i>
        </div>
        {errors.name && (
          <span className="error-text">{errors.name}</span>
        )}

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

        <button className="btn" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;

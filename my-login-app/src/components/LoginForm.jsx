

// import React, { useState } from 'react';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [selectedRole, setSelectedRole] = useState('Student');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted with role:', selectedRole);
//     onLoginSuccess(username || 'User', selectedRole);
//   };

//   return (
//     <div className="form-box login">
//       <div className="form-content">
//         <h1>Login</h1>
//         <div className="input-box">
//           <input 
//             type="text" 
//             placeholder="Username" 
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required 
//           />
//           <i className='bx bxs-user'></i>
//         </div>
//         <div className="input-box">
//           <input 
//             type={showPassword ? "text" : "password"} 
//             placeholder="Password" 
//             required 
//           />
//           <i 
//             className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
//             onClick={() => setShowPassword(!showPassword)}
//             style={{ cursor: 'pointer' }}
//           ></i>
//         </div>
        
//         {/* Role Selection */}
//         <div className="role-selection">
//           <label className="role-label">Login As:</label>
//           <div className="role-options">
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="loginRole" 
//                 value="Student"
//                 checked={selectedRole === 'Student'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Student</span>
//             </label>
            
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="loginRole" 
//                 value="Teacher"
//                 checked={selectedRole === 'Teacher'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Teacher</span>
//             </label>
            
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="loginRole" 
//                 value="Admin"
//                 checked={selectedRole === 'Admin'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Admin</span>
//             </label>
//           </div>
//         </div>

//         <div className="forgot-link">
//           <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
//         </div>
//         <button className="btn" onClick={handleSubmit}>Login</button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [errors, setErrors] = useState({});

  const validateEnrollmentNumber = (value) => {
    if (!value.trim()) {
      return 'Enrollment number is required';
    }
    // Format: Year + Department + Number (e.g., 2021CS001)
    const enrollmentPattern = /^[0-9]{4}[A-Z]{2}[0-9]{6}$/;
    if (!enrollmentPattern.test(value)) {
      return 'Invalid enrollment number format (e.g., 2021CS001)';
    }
    return '';
  };

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

  const handleEnrollmentChange = (e) => {
    const value = e.target.value.toUpperCase();
    setEnrollmentNumber(value);
    if (errors.enrollmentNumber) {
      setErrors({ ...errors, enrollmentNumber: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const enrollmentError = validateEnrollmentNumber(enrollmentNumber);
    const passwordError = validatePassword(password);
    
    if (enrollmentError || passwordError) {
      setErrors({
        enrollmentNumber: enrollmentError,
        password: passwordError
      });
      return;
    }

    // Clear errors
    setErrors({});
    
    // Success - call login handler
    console.log('Login submitted with:', { enrollmentNumber, selectedRole });
    onLoginSuccess(enrollmentNumber, selectedRole);
  };

  return (
    <div className="form-box login">
      <div className="form-content">
        <h1>Login</h1>
        
        {/* Enrollment Number Input */}
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Enrollment Number" 
            value={enrollmentNumber}
            onChange={handleEnrollmentChange}
            className={errors.enrollmentNumber ? 'input-error' : ''}
            required 
          />
          <i className='bx bxs-id-card'></i>
        </div>
        {errors.enrollmentNumber && (
          <span className="error-text">{errors.enrollmentNumber}</span>
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
        
        {/* Role Selection */}
        <div className="role-selection">
          <label className="role-label">Login As:</label>
          <div className="role-options">
            <label className="radio-option">
              <input 
                type="radio" 
                name="loginRole" 
                value="Student"
                checked={selectedRole === 'Student'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Student</span>
            </label>
            
            <label className="radio-option">
              <input 
                type="radio" 
                name="loginRole" 
                value="Teacher"
                checked={selectedRole === 'Teacher'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Teacher</span>
            </label>
            
            <label className="radio-option">
              <input 
                type="radio" 
                name="loginRole" 
                value="Admin"
                checked={selectedRole === 'Admin'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Admin</span>
            </label>
          </div>
        </div>

        <div className="forgot-link">
          <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>
        <button className="btn" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
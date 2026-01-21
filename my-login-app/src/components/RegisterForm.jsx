// import React, { useState } from 'react';

// const RegisterForm = ({ onRegisterSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('student');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     enrollment: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});

//   const validateName = (name) => {
//     const nameRegex = /^[a-zA-Z\s]{3,}$/;
//     return nameRegex.test(name);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Real-time validation
//     if (name === 'name' && value) {
//       setErrors(prev => ({
//         ...prev,
//         name: validateName(value) ? '' : 'Name must be at least 3 characters (letters only)'
//       }));
//     }
    
//     if (name === 'email' && value) {
//       setErrors(prev => ({
//         ...prev,
//         email: validateEmail(value) ? '' : 'Please enter a valid email address'
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newErrors = {};
//     if (!validateName(formData.name)) {
//       newErrors.name = 'Name must be at least 3 characters (letters only)';
//     }
//     if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     if (Object.keys(newErrors).length === 0) {
//       console.log('Registration submitted', { ...formData, role: selectedRole });
//       // Registration success - redirect to login
//       onRegisterSuccess();
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <div className="form-box register">
//       <div className="form-content">
//         <h1>Registration</h1>
        
//         {/* Name Input */}
//         <div className="input-box">
//           <input 
//             type="text" 
//             name="name"
//             placeholder="Full Name" 
//             value={formData.name}
//             onChange={handleInputChange}
//             required 
//           />
//           <i className='bx bxs-user'></i>
//         </div>
//         {errors.name && <span className="error-text">{errors.name}</span>}
        
//         {/* Email Input */}
//         <div className="input-box">
//           <input 
//             type="text" 
//             name="email"
//             placeholder="Email" 
//             value={formData.email}
//             onChange={handleInputChange}
//             required 
//           />
//           <i className='bx bxs-envelope'></i>
//         </div>
//         {errors.email && <span className="error-text">{errors.email}</span>}
        
//         {/* Enrollment Number Input */}
//         <div className="input-box">
//           <input 
//             type="text" 
//             name="enrollment"
//             placeholder="Enrollment Number" 
//             value={formData.enrollment}
//             onChange={handleInputChange}
//             required 
//           />
//           <i className='bx bxs-id-card'></i>
//         </div>
        
//         {/* Role Selection */}
//         <div className="role-selection">
//           <label className="role-label">Select Role:</label>
//           <div className="role-options">
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="role" 
//                 value="student"
//                 checked={selectedRole === 'student'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Student</span>
//             </label>
            
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="role" 
//                 value="teacher"
//                 checked={selectedRole === 'teacher'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Teacher</span>
//             </label>
            
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="role" 
//                 value="admin"
//                 checked={selectedRole === 'admin'}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               />
//               <span className="radio-custom"></span>
//               <span className="role-text">Admin</span>
//             </label>
//           </div>
//         </div>
        
//         {/* Password Input */}
//         <div className="input-box">
//           <input 
//             type={showPassword ? "text" : "password"} 
//             name="password"
//             placeholder="Password" 
//             value={formData.password}
//             onChange={handleInputChange}
//             required 
//           />
//           <i 
//             className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
//             onClick={() => setShowPassword(!showPassword)}
//             style={{ cursor: 'pointer' }}
//           ></i>
//         </div>
        
//         <button className="btn" onClick={handleSubmit}>Register</button>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState, useEffect } from 'react';

const RegisterForm = ({ onRegisterSuccess, isActive }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollment: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Form reset when switching to login
  useEffect(() => {
    if (!isActive) {
      // Reset form when user goes back to login
      setFormData({
        name: '',
        email: '',
        enrollment: '',
        password: ''
      });
      setSelectedRole('student');
      setErrors({});
      setShowPassword(false);
    }
  }, [isActive]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name === 'name' && value) {
      setErrors(prev => ({
        ...prev,
        name: validateName(value) ? '' : 'Name must be at least 3 characters (letters only)'
      }));
    }
    
    if (name === 'email' && value) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Please enter a valid email address'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters (letters only)';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Registration submitted', { ...formData, role: selectedRole });
      // Registration success - redirect to login
      onRegisterSuccess();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="form-box register">
      <div className="form-content">
        <h1>Registration</h1>
        
        {/* Name Input */}
        <div className="input-box">
          <input 
            type="text" 
            name="name"
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          <i className='bx bxs-user'></i>
        </div>
        {errors.name && <span className="error-text">{errors.name}</span>}
        
        {/* Email Input */}
        <div className="input-box">
          <input 
            type="text" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <i className='bx bxs-envelope'></i>
        </div>
        {errors.email && <span className="error-text">{errors.email}</span>}
        
        {/* Enrollment Number Input */}
        <div className="input-box">
          <input 
            type="text" 
            name="enrollment"
            placeholder="Enrollment Number" 
            value={formData.enrollment}
            onChange={handleInputChange}
            required 
          />
          <i className='bx bxs-id-card'></i>
        </div>
        
        {/* Role Selection */}
        <div className="role-selection">
          <label className="role-label">Select Role:</label>
          <div className="role-options">
            <label className="radio-option">
              <input 
                type="radio" 
                name="role" 
                value="student"
                checked={selectedRole === 'student'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Student</span>
            </label>
            
            <label className="radio-option">
              <input 
                type="radio" 
                name="role" 
                value="teacher"
                checked={selectedRole === 'teacher'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Teacher</span>
            </label>
            
            <label className="radio-option">
              <input 
                type="radio" 
                name="role" 
                value="admin"
                checked={selectedRole === 'admin'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="radio-custom"></span>
              <span className="role-text">Admin</span>
            </label>
          </div>
        </div>
        
        {/* Password Input */}
        <div className="input-box">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
          <i 
            className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        
        <button className="btn" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default RegisterForm;
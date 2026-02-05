// import React, { useState } from 'react';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted');
//     // Call the success handler with username
//     onLoginSuccess(username || 'User');
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
//         <div className="forgot-link">
//           <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
//         </div>
//         <button className="btn" onClick={handleSubmit}>Login</button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// import React, { useState } from 'react';

// const LoginForm = ({ onLoginSuccess }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [selectedRole, setSelectedRole] = useState('Student');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted');
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
//         <div className="role-selection" style={{ marginTop: '15px' }}>
//           <label className="role-label" style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Login As:</label>
//           <div className="role-options">
//             <label className="radio-option">
//               <input 
//                 type="radio" 
//                 name="role" 
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
//                 name="role" 
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
//                 name="role" 
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
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted with role:', selectedRole);
    onLoginSuccess(username || 'User', selectedRole);
  };

  return (
    <div className="form-box login">
      <div className="form-content">
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            required 
          />
          <i 
            className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        
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
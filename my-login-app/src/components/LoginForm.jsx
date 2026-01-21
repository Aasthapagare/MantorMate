// import React from 'react';

// const LoginForm = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted');
//   };

//   return (
//     <div className="form-box login">
//       <div className="form-content">
//         <h1>Login</h1>
//         <div className="input-box">
//           <input type="text" placeholder="Username" required />
//           <i className='bx bxs-user'></i>
//         </div>
//         <div className="input-box">
//           <input type="password" placeholder="Password" required />
//           <i className='bx bxs-lock-alt'></i>
//         </div>
//         <div className="forgot-link">
//           <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
//         </div>
//         <button className="btn" onClick={handleSubmit}>Login</button>
//         <p>or login with social platforms</p>
//         <div className="social-icons">
//           <a href="#" onClick={(e) => e.preventDefault()}><i className='bx bxl-google'></i></a>
//           <a href="#" onClick={(e) => e.preventDefault()}><i className='bx bxl-facebook'></i></a>
//           <a href="#" onClick={(e) => e.preventDefault()}><i className='bx bxl-github'></i></a>
//           <a href="#" onClick={(e) => e.preventDefault()}><i className='bx bxl-linkedin'></i></a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className="form-box login">
      <div className="form-content">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
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
        <div className="forgot-link">
          <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
        </div>
        <button className="btn" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
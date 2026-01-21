// import React, { useState } from 'react';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import TogglePanel from './components/TogglePanel';
// import './styles/style.css';

// const App = () => {
//   const [isActive, setIsActive] = useState(false);

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   // Registration success handler - redirect to login
//   const handleRegisterSuccess = () => {
//     setIsActive(false); // Same animation jesa register button click karne par hota hai
//   };

//   return (
//     <div className={`container ${isActive ? 'active' : ''}`}>
//       <LoginForm />
//       <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
//       <TogglePanel 
//         onRegisterClick={handleRegisterClick}
//         onLoginClick={handleLoginClick}
//       />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TogglePanel from './components/TogglePanel';
import './styles/style.css';

const App = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  // Registration success handler - redirect to login
  const handleRegisterSuccess = () => {
    setIsActive(false);
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      <LoginForm />
      <RegisterForm 
        onRegisterSuccess={handleRegisterSuccess} 
        isActive={isActive}
      />
      <TogglePanel 
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default App;
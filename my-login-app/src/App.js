
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
//     setIsActive(false);
//   };

//   return (
//     <div className={`container ${isActive ? 'active' : ''}`}>
//       <LoginForm />
//       <RegisterForm 
//         onRegisterSuccess={handleRegisterSuccess} 
//         isActive={isActive}
//       />
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
import Dashboard from './components/Dashboard';
import './styles/style.css';
import './styles/dashboard.css';

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    role: ''
  });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterSuccess = () => {
    setIsActive(false);
  };

  const handleLoginSuccess = (username) => {
    setUserData({
      username: username,
      role: 'Student' // You can get this from login form
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', role: '' });
  };

  // If logged in, show Dashboard
  if (isLoggedIn) {
    return (
      <Dashboard 
        userRole={userData.role}
        username={userData.username}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise show Login/Register
  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
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
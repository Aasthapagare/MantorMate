

// import React, { useState } from 'react';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import TogglePanel from './components/TogglePanel';
// import Dashboard from './components/Dashboard';
// import ProfilePage from './components/ProfilePage';
// import AdminPanel from './components/AdminPanel';
// import './styles/style.css';
// import './styles/dashboard.css';
// import './styles/profile.css';
// import './styles/admin.css';

// const App = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [userData, setUserData] = useState({
//     username: '',
//     role: ''
//   });

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   const handleRegisterSuccess = () => {
//     setIsActive(false);
//   };

//   const handleLoginSuccess = (username, role) => {
//     console.log('Login Success - Username:', username, 'Role:', role);
//     setUserData({
//       username: username,
//       role: role
//     });
//     setIsLoggedIn(true);
    
//     // Set initial page based on role
//     if (role === 'Admin') {
//       setCurrentPage('admin');
//     } else {
//       setCurrentPage('dashboard');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUserData({ username: '', role: '' });
//     setCurrentPage('dashboard');
//   };

//   const handleNavigation = (page) => {
//     setCurrentPage(page);
//   };

//   if (isLoggedIn) {
//     // Admin Panel - Check both role and page
//     if (userData.role === 'Admin') {
//       return (
//         <AdminPanel 
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // Profile Page
//     if (currentPage === 'profile') {
//       return (
//         <ProfilePage 
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }
    
//     // Dashboard (Student/Teacher)
//     return (
//       <Dashboard 
//         userRole={userData.role}
//         username={userData.username}
//         onLogout={handleLogout}
//         onNavigate={handleNavigation}
//       />
//     );
//   }

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
//       <div className={`container ${isActive ? 'active' : ''}`}>
//         <LoginForm onLoginSuccess={handleLoginSuccess} />
//         <RegisterForm 
//           onRegisterSuccess={handleRegisterSuccess} 
//           isActive={isActive}
//         />
//         <TogglePanel 
//           onRegisterClick={handleRegisterClick}
//           onLoginClick={handleLoginClick}
//         />
//       </div>
//     </>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TogglePanel from './components/TogglePanel';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import './styles/style.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/admin.css';

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userData, setUserData] = useState({
    username: '',
    role: ''
  });

  // Apply theme on app mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterSuccess = () => {
    setIsActive(false);
  };

  const handleLoginSuccess = (username, role) => {
    console.log('Login Success - Username:', username, 'Role:', role);
    
    // Apply saved theme immediately on login
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    setUserData({
      username: username,
      role: role
    });
    setIsLoggedIn(true);
    
    // Set initial page based on role
    if (role === 'Admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', role: '' });
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  if (isLoggedIn) {
    // Admin Panel - Check both role and page
    if (userData.role === 'Admin') {
      return (
        <AdminPanel 
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Profile Page
    if (currentPage === 'profile') {
      return (
        <ProfilePage 
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }
    
    // Dashboard (Student/Teacher)
    return (
      <Dashboard 
        userRole={userData.role}
        username={userData.username}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
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
    </>
  );
};

export default App;
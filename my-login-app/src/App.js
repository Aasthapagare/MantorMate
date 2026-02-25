// import React, { useState, useEffect } from 'react';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import TogglePanel from './components/TogglePanel';
// import Dashboard from './components/Dashboard';
// import ProfilePage from './components/ProfilePage';
// import ProjectManagement from './components/ProjectManagement';
// import AdminPanel from './components/AdminPanel';
// import './styles/style.css';
// import './styles/dashboard.css';
// import './styles/profile.css';
// import './styles/admin.css';
// import './styles/chatpage.css';

// const App = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [userData, setUserData] = useState({
//     username: '',
//     role: ''
//   });

//   // Apply theme on app mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   const handleRegisterSuccess = () => {
//     setIsActive(false);
//   };

//   const handleLoginSuccess = (username) => {
//     console.log('Login success! Username:', username);

//     setUserData({
//       username: username,
//       role: ''
//     });
//     setIsLoggedIn(true);
//     setCurrentPage('dashboard');
//     console.log('isLoggedIn set to true');
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

//     if (currentPage === "profile") {
//       return (
//         <ProfilePage
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

// if (currentPage === "projectManagement") {
//   return (
//     <ProjectManagement
//       userRole={userData.role}
//       username={userData.username}
//       onLogout={handleLogout}
//       onNavigate={handleNavigation}
//     />
//   );
// }
    

//     // if (currentPage === "meeting") {
//     //   return (
//     //     <MeetingRoom
//     //       username={userData.username}
//     //       onNavigate={handleNavigation}
//     //       onLogout={handleLogout}
//     //     />
//     //   );
//     // }

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


// import React, { useState, useEffect } from 'react';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import TogglePanel from './components/TogglePanel';
// import Dashboard from './components/Dashboard';
// import ProfilePage from './components/ProfilePage';
// import ProjectManagement from './components/ProjectManagement';
// import GroupFormation from './components/GroupFormation';
// import GuideSelection from './components/GuideSelection';
// import ProjectIdeaSubmission from './components/ProjectIdeaSubmission';
// import AdminPanel from './components/AdminPanel';
// import './styles/style.css';
// import './styles/dashboard.css';
// import './styles/profile.css';
// import './styles/admin.css';
// import './styles/chatpage.css';

// const App = () => {
//   const [isActive, setIsActive] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [userData, setUserData] = useState({
//     username: '',
//     role: ''
//   });

//   // Apply theme on app mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   const handleRegisterClick = () => {
//     setIsActive(true);
//   };

//   const handleLoginClick = () => {
//     setIsActive(false);
//   };

//   const handleRegisterSuccess = () => {
//     setIsActive(false);
//   };

//   const handleLoginSuccess = (username) => {
//     console.log('Login success! Username:', username);

//     setUserData({
//       username: username,
//       role: ''
//     });
//     setIsLoggedIn(true);
//     setCurrentPage('dashboard');
//     console.log('isLoggedIn set to true');
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

//     if (currentPage === "profile") {
//       return (
//         <ProfilePage
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // Project Management Page
//     if (currentPage === "projectManagement") {
//       return (
//         <ProjectManagement
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // Group Formation Sub-page
//     if (currentPage === "groupFormation") {
//       return (
//         <GroupFormation
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // Guide Selection Sub-page
//     if (currentPage === "guideSelection") {
//       return (
//         <GuideSelection
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // Project Idea Submission Sub-page
//     if (currentPage === "projectIdeaSubmission") {
//       return (
//         <ProjectIdeaSubmission
//           userRole={userData.role}
//           username={userData.username}
//           onLogout={handleLogout}
//           onNavigate={handleNavigation}
//         />
//       );
//     }

//     // if (currentPage === "meeting") {
//     //   return (
//     //     <MeetingRoom
//     //       username={userData.username}
//     //       onNavigate={handleNavigation}
//     //       onLogout={handleLogout}
//     //     />
//     //   );
//     // }

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
import ProjectManagement from './components/ProjectManagement';
import GroupFormation from './components/GroupFormation';
import GuideSelection from './components/GuideSelection';
import ProjectIdeaSubmission from './components/ProjectIdeaSubmission';
import MeetingScheduler from './components/MeetingScheduler';
import AdminPanel from './components/AdminPanel';
import './styles/style.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/admin.css';
import './styles/chatpage.css';

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

  const handleLoginSuccess = (username) => {
    console.log('Login success! Username:', username);

    setUserData({
      username: username,
      role: ''
    });
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    console.log('isLoggedIn set to true');
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

    if (currentPage === "profile") {
      return (
        <ProfilePage
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Project Management Page
    if (currentPage === "projectManagement") {
      return (
        <ProjectManagement
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Group Formation Sub-page
    if (currentPage === "groupFormation") {
      return (
        <GroupFormation
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Guide Selection Sub-page
    if (currentPage === "guideSelection") {
      return (
        <GuideSelection
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Project Idea Submission Sub-page
    if (currentPage === "projectIdeaSubmission") {
      return (
        <ProjectIdeaSubmission
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Meeting Scheduler Page
    if (currentPage === "meetingScheduler") {
      return (
        <MeetingScheduler
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // if (currentPage === "meeting") {
    //   return (
    //     <MeetingRoom
    //       username={userData.username}
    //       onNavigate={handleNavigation}
    //       onLogout={handleLogout}
    //     />
    //   );
    // }

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
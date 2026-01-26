// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import DashboardCards from './DashboardCards';
// import TaskTable from './TaskTable';
// import UploadedFiles from './UploadedFiles';
// import FooterIcons from './FooterIcons';

// const Dashboard = ({ userRole, username, onLogout }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle">
//                 <i className='bx bxs-graduation'></i>
//               </div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button 
//                 className="theme-btn"
//                 onClick={() => setShowThemeDropdown(!showThemeDropdown)}
//               >
//                 <i className='bx bx-palette'></i>
//                 <span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button 
//                     className={theme === 'light' ? 'active' : ''}
//                     onClick={() => handleThemeChange('light')}
//                   >
//                     <i className='bx bx-sun'></i> Light
//                   </button>
//                   <button 
//                     className={theme === 'dark' ? 'active' : ''}
//                     onClick={() => handleThemeChange('dark')}
//                   >
//                     <i className='bx bx-moon'></i> Dark
//                   </button>
//                   <button 
//                     className={theme === 'default' ? 'active' : ''}
//                     onClick={() => handleThemeChange('default')}
//                   >
//                     <i className='bx bx-brush'></i> Default
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <Sidebar 
//             userRole={userRole} 
//             username={username}
//             onLogout={onLogout}
//           />

//           <main className="dashboard-content">
//             <DashboardCards />
//             <TaskTable />
//             <UploadedFiles />
//             <FooterIcons />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import DashboardCards from './DashboardCards';
// import TaskTable from './TaskTable';
// import UploadedFiles from './UploadedFiles';
// import FooterIcons from './FooterIcons';

// const Dashboard = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle">
//                 <i className='bx bxs-graduation'></i>
//               </div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button 
//                 className="theme-btn"
//                 onClick={() => setShowThemeDropdown(!showThemeDropdown)}
//               >
//                 <i className='bx bx-palette'></i>
//                 <span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button 
//                     className={theme === 'light' ? 'active' : ''}
//                     onClick={() => handleThemeChange('light')}
//                   >
//                     <i className='bx bx-sun'></i> Light
//                   </button>
//                   <button 
//                     className={theme === 'dark' ? 'active' : ''}
//                     onClick={() => handleThemeChange('dark')}
//                   >
//                     <i className='bx bx-moon'></i> Dark
//                   </button>
//                   <button 
//                     className={theme === 'default' ? 'active' : ''}
//                     onClick={() => handleThemeChange('default')}
//                   >
//                     <i className='bx bx-brush'></i> Default
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <Sidebar 
//             userRole={userRole} 
//             username={username}
//             onLogout={onLogout}
//             onNavigate={onNavigate}
//           />

//           <main className="dashboard-content">
//             <DashboardCards />
//             <TaskTable />
//             <UploadedFiles />
//             <FooterIcons />
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardCards from './DashboardCards';
import TaskTable from './TaskTable';
import UploadedFiles from './UploadedFiles';
import FooterIcons from './FooterIcons';

const Dashboard = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle">
                <i className='bx bxs-graduation'></i>
              </div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button 
                className="theme-btn"
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                <i className='bx bx-palette'></i>
                <span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button 
                    className={theme === 'light' ? 'active' : ''}
                    onClick={() => handleThemeChange('light')}
                  >
                    <i className='bx bx-sun'></i> Light
                  </button>
                  <button 
                    className={theme === 'dark' ? 'active' : ''}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <i className='bx bx-moon'></i> Dark
                  </button>
                  <button 
                    className={theme === 'default' ? 'active' : ''}
                    onClick={() => handleThemeChange('default')}
                  >
                    <i className='bx bx-brush'></i> Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          <Sidebar 
            userRole={userRole} 
            username={username}
            onLogout={onLogout}
            onNavigate={onNavigate}
          />

          <main className="dashboard-content">
            <DashboardCards />
            <TaskTable />
            <UploadedFiles />
            <FooterIcons />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
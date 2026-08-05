
// import React, { useState, useEffect } from 'react';

// const GuideSidebar = ({ userRole, username, onLogout, onNavigate, currentView, onSearchToggle, showSearchBar }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const getActiveMenu = () => {
//     if (showSearchBar) return 'search';
//     if (currentView === 'dashboard')         return 'home';
//     if (currentView === 'projectManagement') return 'projectManagement';
//     if (currentView === 'attendance')        return 'attendance';
//     if (currentView === 'schedule')          return 'schedule';
//     if (currentView === 'profile')           return 'profile';
//     return 'home';
//   };

//   const activeMenu = getActiveMenu();

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setProfileImage(event.target.result);
//         localStorage.setItem('guideProfileImage', event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//     setShowProfileMenu(false);
//   };

//   const handleRemoveProfile = () => {
//     setProfileImage(null);
//     localStorage.removeItem('guideProfileImage');
//     setShowProfileMenu(false);
//   };

//   useEffect(() => {
//     const savedImage = localStorage.getItem('guideProfileImage');
//     if (savedImage) setProfileImage(savedImage);
//   }, []);

//   const menuItems = [
//     { id: 'home',              icon: 'bx-home',         label: 'Home'               },
//     { id: 'search',            icon: 'bx-search',       label: 'Search'             },
//     { id: 'attendance',        icon: 'bx-check-circle', label: 'Attendance'         },
//     { id: 'projectManagement', icon: 'bx-briefcase',    label: 'Project Management' },
//     { id: 'about',             icon: 'bx-info-circle',  label: 'About'              },
//     { id: 'notification',      icon: 'bx-bell',         label: 'Notification'       },
//     { id: 'profile',           icon: 'bx-user',         label: 'Profile'            },
//   ];

//   const handleMenuClick = (menuId) => {
//     if (menuId === 'home') {
//       if (onSearchToggle) onSearchToggle(false);
//       if (onNavigate) onNavigate('dashboard');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       const mainContent = document.querySelector('.dashboard-content');
//       if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });

//     } else if (menuId === 'search') {
//       // If not on dashboard, navigate there first then open search
//       if (currentView !== 'dashboard') {
//         if (onNavigate) onNavigate('dashboard');
//       }
//       // Always open search bar — no navigate call when already on dashboard
//       if (onSearchToggle) onSearchToggle(true);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       const mainContent = document.querySelector('.dashboard-content');
//       if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });

//     } else if (menuId === 'attendance') {
//       if (onSearchToggle) onSearchToggle(false);
//       if (onNavigate) onNavigate('attendance');

//     } else if (menuId === 'projectManagement') {
//       if (onSearchToggle) onSearchToggle(false);
//       if (onNavigate) onNavigate('projectManagement');

//     } else if (menuId === 'schedule') {
//       if (onSearchToggle) onSearchToggle(false);
//       if (onNavigate) onNavigate('schedule');

//     } else if (menuId === 'profile') {
//       if (onSearchToggle) onSearchToggle(false);
//       if (onNavigate) onNavigate('profile');
//     }

//     setIsSidebarOpen(false);
//   };

//   return (
//     <>
//       <button
//         className="mobile-menu-toggle"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         <i className='bx bx-menu'></i>
//       </button>

//       {isSidebarOpen && (
//         <div
//           className="sidebar-overlay"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//         <div className="sidebar-profile">
//           <span className="user-role-badge">Guide</span>

//           <div className="profile-image-wrapper">
//             <div
//               className="profile-image"
//               onClick={() => setShowProfileMenu(!showProfileMenu)}
//             >
//               {profileImage ? (
//                 <img src={profileImage} alt="Profile" />
//               ) : (
//                 <i className='bx bx-user'></i>
//               )}
//             </div>

//             {showProfileMenu && (
//               <div className="profile-menu">
//                 <label htmlFor="guide-profile-upload" className="profile-menu-item">
//                   <i className='bx bx-edit'></i>
//                   <span>Edit Profile</span>
//                 </label>
//                 <button className="profile-menu-item" onClick={handleRemoveProfile}>
//                   <i className='bx bx-trash'></i>
//                   <span>Remove Picture</span>
//                 </button>
//               </div>
//             )}
//             <input
//               type="file"
//               id="guide-profile-upload"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: 'none' }}
//             />
//           </div>

//           <h3 className="username">{username}</h3>
//         </div>

//         <nav className="sidebar-nav">
//           {menuItems.map(item => (
//             <button
//               key={item.id}
//               className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
//               onClick={() => handleMenuClick(item.id)}
//             >
//               <i className={`bx ${item.icon}`}></i>
//               <span>{item.label}</span>
//               <div className="nav-indicator"></div>
//             </button>
//           ))}
//         </nav>

//         <button className="logout-btn" onClick={onLogout}>
//           <i className='bx bx-log-out'></i>
//           <span>Logout</span>
//         </button>
//       </aside>
//     </>
//   );
// };

// export default GuideSidebar;

import React, { useState, useEffect } from 'react';

const GuideSidebar = ({ userRole, username, onLogout, onNavigate, currentView, onSearchToggle, showSearchBar }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getActiveMenu = () => {
    if (showSearchBar) return 'search';
    if (currentView === 'dashboard')         return 'home';
    if (currentView === 'projectManagement') return 'projectManagement';
    if (currentView === 'attendance')        return 'attendance';
    if (currentView === 'schedule')          return 'schedule';
    if (currentView === 'profile')           return 'profile';
    if (currentView === 'about')             return 'about';
    return 'home';
  };

  const activeMenu = getActiveMenu();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        localStorage.setItem('guideProfileImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setShowProfileMenu(false);
  };

  const handleRemoveProfile = () => {
    setProfileImage(null);
    localStorage.removeItem('guideProfileImage');
    setShowProfileMenu(false);
  };

  useEffect(() => {
    const savedImage = localStorage.getItem('guideProfileImage');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const menuItems = [
    { id: 'home',              icon: 'bx-home',         label: 'Home'               },
    { id: 'search',            icon: 'bx-search',       label: 'Search'             },
    { id: 'attendance',        icon: 'bx-check-circle', label: 'Attendance'         },
    { id: 'projectManagement', icon: 'bx-briefcase',    label: 'Project Management' },
    { id: 'about',             icon: 'bx-info-circle',  label: 'About'              },
    { id: 'notification',      icon: 'bx-bell',         label: 'Notification'       },
    { id: 'profile',           icon: 'bx-user',         label: 'Profile'            },
  ];

  const handleMenuClick = (menuId) => {
    if (menuId === 'home') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mainContent = document.querySelector('.dashboard-content');
      if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });

    } else if (menuId === 'search') {
      // If not on dashboard, navigate there first then open search
      if (currentView !== 'dashboard') {
        if (onNavigate) onNavigate('dashboard');
      }
      // Always open search bar — no navigate call when already on dashboard
      if (onSearchToggle) onSearchToggle(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mainContent = document.querySelector('.dashboard-content');
      if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });

    } else if (menuId === 'attendance') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('attendance');

    } else if (menuId === 'projectManagement') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('projectManagement');

    } else if (menuId === 'schedule') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('schedule');

    } else if (menuId === 'profile') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('profile');
    } else if (menuId === 'about') {
      if (onSearchToggle) onSearchToggle(false);
      if (onNavigate) onNavigate('about');
    }

    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className='bx bx-menu'></i>
      </button>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-profile">
          <span className="user-role-badge">Guide</span>

          <div className="profile-image-wrapper">
            <div
              className="profile-image"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <i className='bx bx-user'></i>
              )}
            </div>

            {showProfileMenu && (
              <div className="profile-menu">
                <label htmlFor="guide-profile-upload" className="profile-menu-item">
                  <i className='bx bx-edit'></i>
                  <span>Edit Profile</span>
                </label>
                <button className="profile-menu-item" onClick={handleRemoveProfile}>
                  <i className='bx bx-trash'></i>
                  <span>Remove Picture</span>
                </button>
              </div>
            )}
            <input
              type="file"
              id="guide-profile-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          <h3 className="username">{username}</h3>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <i className={`bx ${item.icon}`}></i>
              <span>{item.label}</span>
              <div className="nav-indicator"></div>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          <i className='bx bx-log-out'></i>
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default GuideSidebar;
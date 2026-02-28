
// // import React, { useState, useEffect } from 'react';

// // const Sidebar = ({ userRole, username, onLogout, onNavigate, onSearchToggle }) => {

// import React, { useState, useEffect } from 'react';

// const Sidebar = ({ userRole, username, onLogout, onNavigate, onSearchToggle, onAdminHomeClick, isAdminPanel, currentPage, isSearchOpen }) => {
//   const [activeMenu, setActiveMenu] = useState('home');
//   const [profileImage, setProfileImage] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   useEffect(() => {
//     const savedImage = localStorage.getItem('profileImage');
//     if (savedImage) {
//       setProfileImage(savedImage);
//     }
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setProfileImage(event.target.result);
//         localStorage.setItem('profileImage', event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//     setShowProfileMenu(false);
//   };

//   const handleRemoveProfile = () => {
//     setProfileImage(null);
//     localStorage.removeItem('profileImage');
//     setShowProfileMenu(false);
//   };

//   React.useEffect(() => {
//     const savedImage = localStorage.getItem('profileImage');
//     if (savedImage) {
//       setProfileImage(savedImage);
//     }
//   }, []);

//   // FIX 3: Sync activeMenu with currentPage prop and search state
//   React.useEffect(() => {
//     if (isSearchOpen) {
//       // When search is open, highlight search
//       setActiveMenu('search');
//     } else if (currentPage === 'dashboard') {
//       setActiveMenu('home');
//     } else if (currentPage === 'profile') {
//       setActiveMenu('profile');
//     }
//   }, [currentPage, isSearchOpen]);
//   const menuItems = [
//     { id: 'home', icon: 'bx-home', label: 'Home' },
//     { id: 'search', icon: 'bx-search', label: 'Search' },
//     { id: 'meeting', icon: 'bx-video', label: 'Meeting' },
//     { id: 'notification', icon: 'bx-bell', label: 'Notification' },
//     { id: 'about', icon: 'bx-info-circle', label: 'About' },
//     { id: 'profile', icon: 'bx-user', label: 'Profile' }
//   ];

//   const handleMenuClick = (menuId) => {

//     setActiveMenu(menuId);

//     if (menuId === 'home') {
//       onNavigate?.('dashboard');
//       onSearchToggle?.(false);
//     }
//     else if (menuId === 'search') {
//       onNavigate?.('dashboard');
//       onSearchToggle?.(true);
//     }
//     else if (menuId === 'meeting') {
//       onNavigate?.('meeting');
//       onSearchToggle?.(false);
//     }
//     else if (menuId === 'profile') {
//       onNavigate?.('profile');
//       onSearchToggle?.(false);
//       if (isAdminPanel && onAdminHomeClick) {
//         onAdminHomeClick();
//       } else {
//         if (onNavigate) {
//           onNavigate('dashboard');
//         }
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         const mainContent = document.querySelector('.dashboard-content');
//         if (mainContent) {
//           mainContent.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//         if (onSearchToggle) {
//           onSearchToggle(false);
//         }
//       }
//     } else if (menuId === 'search') {
//       if (onNavigate) {
//         onNavigate('dashboard');
//       }
      
//       if (onSearchToggle) {
//         onSearchToggle(true);
//       }
      
//       setTimeout(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         const mainContent = document.querySelector('.dashboard-content');
//         if (mainContent) {
//           mainContent.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//       }, 100);
//     } else if (menuId === 'profile' && onNavigate) {
//       onNavigate('profile');
//       if (onSearchToggle) {
//         onSearchToggle(false);
//       }
//     }
//   };

//   return (
//     <>
//       <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//         <i className='bx bx-menu'></i>
//       </button>

//       {isSidebarOpen && (
//         <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
//       )}

//       <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>

//         <div className="sidebar-profile">

//           <span className="user-role-badge">{userRole}</span>

//           <div className="profile-image-wrapper">

//             <div className="profile-image" onClick={() => setShowProfileMenu(!showProfileMenu)}>
//               {profileImage ? <img src={profileImage} alt="Profile"/> : <i className='bx bx-user'></i>}
//             </div>

//             {showProfileMenu && (
//               <div className="profile-menu">
//                 <label htmlFor="profile-upload" className="profile-menu-item">
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
//               id="profile-upload"
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

//         <div className="sidebar-footer">
//           <button className="logout-btn" onClick={onLogout}>
//             <i className='bx bx-log-out'></i>
//             <span>Logout</span>
//           </button>
//         </div>

//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';

const Sidebar = ({ userRole, username, onLogout, onNavigate, onSearchToggle, onAdminHomeClick, isAdminPanel, currentPage, isSearchOpen }) => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [profileImage, setProfileImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        localStorage.setItem('profileImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setShowProfileMenu(false);
  };

  const handleRemoveProfile = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    setShowProfileMenu(false);
  };

  React.useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Sync activeMenu with currentPage prop and search state
  React.useEffect(() => {
    if (isSearchOpen) {
      setActiveMenu('search');
    } else if (currentPage === 'dashboard') {
      setActiveMenu('home');
    } else if (currentPage === 'profile') {
      setActiveMenu('profile');
    } else if (currentPage === 'projectManagement') {
      setActiveMenu('projectManagement');
    }
  }, [currentPage, isSearchOpen]);

  const menuItems = [
    { id: 'home', icon: 'bx-home', label: 'Home' },
    { id: 'search', icon: 'bx-search', label: 'Search' },
    { id: 'projectManagement', icon: 'bx-briefcase', label: 'Project Management' },
    { id: 'notification', icon: 'bx-bell', label: 'Notification' },
    { id: 'about', icon: 'bx-info-circle', label: 'About' },
    { id: 'profile', icon: 'bx-user', label: 'Profile' }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    
    if (menuId === 'home') {
      if (isAdminPanel && onAdminHomeClick) {
        onAdminHomeClick();
      } else {
        if (onNavigate) {
          onNavigate('dashboard');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainContent = document.querySelector('.dashboard-content');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (onSearchToggle) {
          onSearchToggle(false);
        }
      }
    } else if (menuId === 'search') {
      if (onNavigate) {
        onNavigate('dashboard');
      }
      localStorage.setItem('openSearch', 'true');
      if (onSearchToggle) {
        onSearchToggle(true);
      }
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const mainContent = document.querySelector('.dashboard-content');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else if (menuId === 'projectManagement' && onNavigate) {
      onNavigate('projectManagement');
      if (onSearchToggle) {
        onSearchToggle(false);
      }
    } else if (menuId === 'profile' && onNavigate) {
      onNavigate('profile');
      if (onSearchToggle) {
        onSearchToggle(false);
      }
    }
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
          <span className="user-role-badge">{userRole}</span>
          
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
                <label htmlFor="profile-upload" className="profile-menu-item">
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
              id="profile-upload"
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

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <i className='bx bx-log-out'></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

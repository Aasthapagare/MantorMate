import React, { useEffect, useState } from 'react';

const GuideSidebar = ({ userRole, username, onLogout, onNavigate, currentView }) => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [profileImage, setProfileImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (currentView === 'dashboard') {
      setActiveMenu('home');
    } else if (currentView === 'projectManagement') {
      setActiveMenu('projectManagement');
    } else if (currentView === 'documents') {
      setActiveMenu('documents');
    } else if (currentView === 'attendance') {
      setActiveMenu('attendance');
    } else if (currentView === 'profile') {
      setActiveMenu('profile');
    }
  }, [currentView]);

  useEffect(() => {
    const savedImage = localStorage.getItem('guideProfileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

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

  const menuItems = [
    { id: 'home', icon: 'bx-home', label: 'Home' },
    { id: 'attendance', icon: 'bx-check-circle', label: 'Attendance' },
    { id: 'projectManagement', icon: 'bx-briefcase', label: 'Project Management' },
    { id: 'documents', icon: 'bx-folder-open', label: 'Documents' },
    { id: 'about', icon: 'bx-info-circle', label: 'About' },
    { id: 'notification', icon: 'bx-bell', label: 'Notification' },
    { id: 'profile', icon: 'bx-user', label: 'Profile' }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);

    if (menuId === 'home') {
      onNavigate && onNavigate('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const mainContent = document.querySelector('.dashboard-content');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (menuId === 'attendance') {
      onNavigate && onNavigate('attendance');
    } else if (menuId === 'projectManagement') {
      onNavigate && onNavigate('projectManagement');
    } else if (menuId === 'documents') {
      onNavigate && onNavigate('documents');
    } else if (menuId === 'notification') {
      onNavigate && onNavigate('notification');
    } else if (menuId === 'profile') {
      onNavigate && onNavigate('profile');
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
          <p className="sidebar-profile-meta">{userRole || 'Guide'}</p>
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

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../styles/profile.css';

const AdminProfilePage = ({ userRole, username, onLogout, onNavigate, onAdminHomeClick }) => {
  const [theme, setTheme]                       = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isEditMode, setIsEditMode]             = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileImage, setProfileImage]         = useState(localStorage.getItem('adminProfileImage') || null);

  const [profileData, setProfileData] = useState({
    fullName:    'Admin User',
    department:  'Administration',
    adminId:     'ADMIN2024001',
    email:       'admin@mentormate.edu',
    designation: 'System Administrator',
  });

  const [passwords, setPasswords]       = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');

  const handleThemeChange = (t) => {
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    setShowThemeDropdown(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Admin Profile Updated:', profileData);
    setIsEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New passwords do not match!');
      return;
    }
    setPasswordError('');
    setShowChangePassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        localStorage.setItem('adminProfileImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <div className="dashboard-wrapper">

        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle">
                <i className="bx bxs-graduation"></i>
              </div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-center">
            <span className="admin-badge"><i className='bx bx-shield'></i> Admin Panel</span>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <i className="bx bx-palette"></i><span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button className={theme === 'light'   ? 'active' : ''} onClick={() => handleThemeChange('light')}>
                    <i className="bx bx-sun"></i> Light
                  </button>
                  <button className={theme === 'dark'    ? 'active' : ''} onClick={() => handleThemeChange('dark')}>
                    <i className="bx bx-moon"></i> Dark
                  </button>
                  <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}>
                    <i className="bx bx-brush"></i> Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          {/* Admin Sidebar — same as AdminPanel */}
          <Sidebar
            userRole={userRole}
            username={username}
            onLogout={onLogout}
            onNavigate={onNavigate}
            onSearchToggle={() => {}}
            onAdminHomeClick={onAdminHomeClick}
            isAdminPanel={true}
            currentPage="profile"
          />

          <main className="dashboard-content">
            <div className="profile-page-content">

              {/* Top Section — same 2-col grid as Student/Guide */}
              <div className="profile-top-section">

                {/* Left — Photo + Bio */}
                <div className="profile-info-card">
                  <div className="profile-picture-section">
                    <div className="profile-pic-large">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                      ) : (
                        <i className="bx bx-user"></i>
                      )}
                    </div>
                    <label htmlFor="admin-profile-pic-upload" className="upload-pic-btn">
                      <i className="bx bx-camera"></i> Change Photo
                    </label>
                    <input
                      type="file"
                      id="admin-profile-pic-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>

                  <div className="bio-section">
                    <h3 className="bio-title">Bio Details</h3>
                    <div className="bio-item">
                      <span className="bio-label">Full Name:</span>
                      <span className="bio-value">{profileData.fullName}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Department:</span>
                      <span className="bio-value">{profileData.department}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Admin ID:</span>
                      <span className="bio-value">{profileData.adminId}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Email ID:</span>
                      <span className="bio-value">{profileData.email}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Designation:</span>
                      <span className="bio-value">{profileData.designation}</span>
                    </div>
                  </div>
                </div>

                {/* Right — Actions + Forms */}
                <div className="profile-actions-card">
                  <button
                    className="action-btn edit-profile-btn"
                    onClick={() => { setIsEditMode(!isEditMode); setShowChangePassword(false); }}
                  >
                    <i className="bx bx-edit"></i>
                    {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
                  </button>

                  <button
                    className="action-btn change-password-btn"
                    onClick={() => { setShowChangePassword(!showChangePassword); setIsEditMode(false); }}
                  >
                    <i className="bx bx-lock-alt"></i>
                    Change Password
                  </button>

                  {/* Edit Form */}
                  {isEditMode && (
                    <div className="edit-form-container">
                      <h3 className="form-title">Edit Profile</h3>
                      <form onSubmit={handleProfileUpdate} className="edit-profile-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input
                            type="text"
                            value={profileData.fullName}
                            onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Department</label>
                          <input
                            type="text"
                            value={profileData.department}
                            onChange={e => setProfileData({ ...profileData, department: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Email ID</label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Designation</label>
                          <input
                            type="text"
                            value={profileData.designation}
                            onChange={e => setProfileData({ ...profileData, designation: e.target.value })}
                            required
                          />
                        </div>
                        <button type="submit" className="submit-btn">
                          <i className="bx bx-save"></i> Save Changes
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Change Password Form */}
                  {showChangePassword && (
                    <div className="edit-form-container">
                      <h3 className="form-title">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="edit-profile-form">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input
                            type="password"
                            value={passwords.current}
                            onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            value={passwords.new}
                            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input
                            type="password"
                            value={passwords.confirm}
                            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            required
                          />
                        </div>
                        {passwordError && (
                          <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '0' }}>
                            {passwordError}
                          </p>
                        )}
                        <button type="submit" className="submit-btn">
                          <i className="bx bx-check"></i> Update Password
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              {/* No Achievements section for Admin */}

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminProfilePage;
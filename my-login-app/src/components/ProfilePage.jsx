
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FooterIcons from './FooterIcons';

const ProfilePage = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    course: 'B.Tech',
    branch: 'Computer Science',
    enrollmentNumber: '2021CS001',
    email: 'john.doe@example.com',
    domain: 'Web Development'
  });

  const [achievements] = useState([
    { id: 1, title: 'Hackathon Winner 2025', date: 'Jan 15, 2026' },
    { id: 2, title: 'Research Paper Published', date: 'Dec 20, 2025' },
    { id: 3, title: 'Best Project Award', date: 'Nov 10, 2025' }
  ]);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', profileData);
    setIsEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new === passwords.confirm) {
      console.log('Password Changed');
      setShowChangePassword(false);
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      alert('New passwords do not match!');
    }
  };

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
  };

  // FIX 1: Separate handlers for Search and Chat to avoid conflicts
  const handleFooterSearch = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
    // Set flag for search to open
    localStorage.setItem('openSearch', 'true');
  };

  const handleFooterChat = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
    // Set flag for chat to open
    localStorage.setItem('openChat', 'true');
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
            onSearchToggle={() => {}}
            currentPage="profile"
            isSearchOpen={false}
          />

          <main className="dashboard-content">
            <div className="profile-page-content">
              
              <div className="profile-top-section">
                
                <div className="profile-info-card">
                  <div className="profile-picture-section">
                    <div className="profile-pic-large">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                      ) : (
                        <i className='bx bx-user'></i>
                      )}
                    </div>
                    <label htmlFor="profile-pic-upload" className="upload-pic-btn">
                      <i className='bx bx-camera'></i> Change Photo
                    </label>
                    <input 
                      type="file" 
                      id="profile-pic-upload"
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
                      <span className="bio-label">Course:</span>
                      <span className="bio-value">{profileData.course}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Branch:</span>
                      <span className="bio-value">{profileData.branch}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Enrollment Number:</span>
                      <span className="bio-value">{profileData.enrollmentNumber}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Email ID:</span>
                      <span className="bio-value">{profileData.email}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Domain:</span>
                      <span className="bio-value">{profileData.domain}</span>
                    </div>
                  </div>
                </div>

                <div className="profile-actions-card">
                  <button 
                    className="action-btn edit-profile-btn"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <i className='bx bx-edit'></i>
                    {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                  
                  <button 
                    className="action-btn change-password-btn"
                    onClick={() => setShowChangePassword(!showChangePassword)}
                  >
                    <i className='bx bx-lock-alt'></i>
                    Change Password
                  </button>

                  {isEditMode && (
                    <div className="edit-form-container">
                      <h3 className="form-title">Edit Profile</h3>
                      <form onSubmit={handleProfileUpdate} className="edit-profile-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input 
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Course</label>
                          <input 
                            type="text"
                            value={profileData.course}
                            onChange={(e) => setProfileData({...profileData, course: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Branch</label>
                          <input 
                            type="text"
                            value={profileData.branch}
                            onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input 
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Domain</label>
                          <input 
                            type="text"
                            value={profileData.domain}
                            onChange={(e) => setProfileData({...profileData, domain: e.target.value})}
                            required
                          />
                        </div>
                        <button type="submit" className="submit-btn">
                          <i className='bx bx-save'></i> Save Changes
                        </button>
                      </form>
                    </div>
                  )}

                  {showChangePassword && (
                    <div className="edit-form-container">
                      <h3 className="form-title">Change Password</h3>
                      <form onSubmit={handlePasswordChange} className="edit-profile-form">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input 
                            type="password"
                            value={passwords.current}
                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input 
                            type="password"
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input 
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            required
                          />
                        </div>
                        <button type="submit" className="submit-btn">
                          <i className='bx bx-check'></i> Update Password
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              <div className="achievements-section">
                <div className="section-header">
                  <h2 className="section-title">Achievements</h2>
                  <button className="upload-achievement-btn">
                    <i className='bx bx-plus'></i> Upload Achievement
                  </button>
                </div>
                
                <div className="achievements-grid">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="achievement-card">
                      <div className="achievement-icon">
                        <i className='bx bx-trophy'></i>
                      </div>
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <p className="achievement-date">
                        <i className='bx bx-calendar'></i> {achievement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <FooterIcons 
                onOpenChat={handleFooterChat}
                onOpenSearch={handleFooterSearch}
                onNavigate={onNavigate}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
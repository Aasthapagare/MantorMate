import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './Sidebar';
import FooterIcons from './FooterIcons';
import { authFetch } from '../services/authService';

const ProfilePage = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const enrollmentNumber = localStorage.getItem('userId') || '';
  const storedName = localStorage.getItem('name') || username || 'Student';
  const storedRole = localStorage.getItem('role') || userRole || 'STUDENT';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!enrollmentNumber) {
        setProfileData({
          userId: '',
          name: storedName,
          email: 'Not available',
          role: storedRole
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await authFetch(`/users/${enrollmentNumber}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Profile load failed with status ${response.status}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (fetchError) {
        console.error('Profile load error:', fetchError);
        setError('Cannot load profile details.');
        setProfileData({
          userId: enrollmentNumber,
          name: storedName,
          email: 'Not available',
          role: storedRole
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [enrollmentNumber, storedName, storedRole]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setProfileImage(loadEvent.target.result);
        localStorage.setItem('profileImage', loadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFooterChat = () => {
    onNavigate?.('dashboard');
    localStorage.setItem('openChat', 'true');
  };

  const profileSummary = useMemo(() => {
    const roleValue = String(profileData?.role || storedRole || 'STUDENT')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return [
      { label: 'Full Name', value: profileData?.name || storedName },
      { label: 'Email ID', value: profileData?.email || 'Not available' },
      { label: 'Enrollment Number', value: enrollmentNumber || 'Not available' },
      { label: 'Role', value: roleValue },
      { label: 'Account Status', value: 'Active student account' },
      { label: 'Profile Mode', value: 'Read only' }
    ];
  }, [enrollmentNumber, profileData, storedName, storedRole]);

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
            currentPage="profile"
          />

          <main className="dashboard-content">
            <div className="profile-page-content">
              {error && <div className="profile-status-banner">{error}</div>}

              <section className="profile-hero-card">
                <div className="profile-hero-copy">
                  <span className="profile-kicker">Student Profile</span>
                  <h2>{profileData?.name || storedName}</h2>
                  <p>Your current logged-in account information is shown here.</p>
                </div>
                <div className="profile-hero-badge">
                  <span>{String(profileData?.role || storedRole || 'STUDENT').toUpperCase()}</span>
                </div>
              </section>

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
                      <i className='bx bx-camera'></i> Update Photo
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
                    <h3 className="bio-title">Profile Details</h3>
                    {loading ? (
                      <div className="profile-loading-state">
                        <i className='bx bx-loader-alt bx-spin'></i>
                        <span>Loading profile...</span>
                      </div>
                    ) : (
                      profileSummary.map((item) => (
                        <div className="bio-item" key={item.label}>
                          <span className="bio-label">{item.label}</span>
                          <span className="bio-value">{item.value}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="profile-actions-card">
                  <div className="profile-readonly-card">
                    <div className="profile-readonly-head">
                      <i className='bx bx-shield-quarter'></i>
                      <div>
                        <h3>Static View</h3>
                        <p>Logged-in student information.</p>
                      </div>
                    </div>
                    <div className="profile-readonly-list">
                      <div className="profile-readonly-item">
                        <span>Display Name</span>
                        <strong>{profileData?.name || storedName}</strong>
                      </div>
                      <div className="profile-readonly-item">
                        <span>Login ID</span>
                        <strong>{enrollmentNumber || 'Not available'}</strong>
                      </div>
                      <div className="profile-readonly-item">
                        <span>Registered Email</span>
                        <strong>{profileData?.email || 'Not available'}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="profile-note-card">
                    <h3>Note</h3>
                    <p>This page is read only. Student account details are being shown from the current login session.</p>
                  </div>
                </div>
              </div>

              <section className="achievements-section">
                <div className="section-header">
                  <h2 className="section-title">Account Overview</h2>
                </div>

                <div className="profile-overview-grid">
                  {profileSummary.map((item) => (
                    <div key={item.label} className="profile-overview-card">
                      <span>{item.label}</span>
                      <strong>{loading ? 'Loading...' : item.value}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <FooterIcons
                onOpenChat={handleFooterChat}
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

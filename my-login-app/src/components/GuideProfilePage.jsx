// import React, { useState } from 'react';
// import GuideSidebar from './GuideSidebar';
// import GuideFooter from './GuideFooter';
// import '../styles/profile.css';

// const GuideProfilePage = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [profileImage, setProfileImage] = useState(localStorage.getItem('guideProfilePageImage') || null);

//   const [profileData, setProfileData] = useState({
//     fullName: 'Dr. Rajesh Kumar',
//     qualification: 'Ph.D. Computer Science',
//     department: 'Computer Science & Engineering',
//     facultyId: 'FAC2021CS001',
//     email: 'rajesh.kumar@mentormate.edu',
//     expertise: 'Artificial Intelligence & Machine Learning'
//   });

//   const [achievements, setAchievements] = useState([
//     { id: 1, title: 'Best Faculty Award 2025', date: 'Jan 15, 2026' },
//     { id: 2, title: 'Research Paper Published', date: 'Dec 20, 2025' },
//     { id: 3, title: 'IEEE Conference Speaker', date: 'Nov 10, 2025' }
//   ]);

//   const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
//   const [passwordError, setPasswordError] = useState('');

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleProfileUpdate = (e) => {
//     e.preventDefault();
//     console.log('Guide Profile Updated:', profileData);
//     setIsEditMode(false);
//   };

//   const handlePasswordChange = (e) => {
//     e.preventDefault();
//     if (passwords.new !== passwords.confirm) {
//       setPasswordError('New passwords do not match!');
//       return;
//     }
//     setPasswordError('');
//     console.log('Password Changed');
//     setShowChangePassword(false);
//     setPasswords({ current: '', new: '', confirm: '' });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setProfileImage(event.target.result);
//         localStorage.setItem('guideProfilePageImage', event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUploadAchievement = () => {
//     const title = window.prompt('Enter achievement title:');
//     if (title && title.trim()) {
//       const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
//       setAchievements(prev => [
//         ...prev,
//         { id: Date.now(), title: title.trim(), date: today }
//       ]);
//     }
//   };

//   return (
//     <>
//       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
//       <div className="dashboard-wrapper">

//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle">
//                 <i className="bx bxs-graduation"></i>
//               </div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
//                 <i className="bx bx-palette"></i>
//                 <span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}>
//                     <i className="bx bx-sun"></i> Light
//                   </button>
//                   <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}>
//                     <i className="bx bx-moon"></i> Dark
//                   </button>
//                   <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}>
//                     <i className="bx bx-brush"></i> Default
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           {/* Guide Sidebar */}
//           <GuideSidebar
//             userRole={userRole}
//             username={username}
//             onLogout={onLogout}
//             onNavigate={onNavigate}
//             currentView="profile"
//             onSearchToggle={() => {}}
//           />

//           <main className="dashboard-content">
//             <div className="profile-page-content">

//               {/* Top Section — same grid layout as student profile */}
//               <div className="profile-top-section">

//                 {/* Left Card — Photo + Bio */}
//                 <div className="profile-info-card">
//                   <div className="profile-picture-section">
//                     <div className="profile-pic-large">
//                       {profileImage ? (
//                         <img src={profileImage} alt="Profile" />
//                       ) : (
//                         <i className="bx bx-user"></i>
//                       )}
//                     </div>
//                     <label htmlFor="guide-profile-pic-upload" className="upload-pic-btn">
//                       <i className="bx bx-camera"></i> Change Photo
//                     </label>
//                     <input
//                       type="file"
//                       id="guide-profile-pic-upload"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       style={{ display: 'none' }}
//                     />
//                   </div>

//                   <div className="bio-section">
//                     <h3 className="bio-title">Bio Details</h3>
//                     <div className="bio-item">
//                       <span className="bio-label">Full Name:</span>
//                       <span className="bio-value">{profileData.fullName}</span>
//                     </div>
//                     <div className="bio-item">
//                       <span className="bio-label">Qualification:</span>
//                       <span className="bio-value">{profileData.qualification}</span>
//                     </div>
//                     <div className="bio-item">
//                       <span className="bio-label">Department:</span>
//                       <span className="bio-value">{profileData.department}</span>
//                     </div>
//                     <div className="bio-item">
//                       <span className="bio-label">Faculty ID:</span>
//                       <span className="bio-value">{profileData.facultyId}</span>
//                     </div>
//                     <div className="bio-item">
//                       <span className="bio-label">Email ID:</span>
//                       <span className="bio-value">{profileData.email}</span>
//                     </div>
//                     <div className="bio-item">
//                       <span className="bio-label">Expertise:</span>
//                       <span className="bio-value">{profileData.expertise}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Card — Actions + Forms */}
//                 <div className="profile-actions-card">
//                   <button
//                     className="action-btn edit-profile-btn"
//                     onClick={() => { setIsEditMode(!isEditMode); setShowChangePassword(false); }}
//                   >
//                     <i className="bx bx-edit"></i>
//                     {isEditMode ? 'Cancel Edit' : 'Edit Profile'}
//                   </button>

//                   <button
//                     className="action-btn change-password-btn"
//                     onClick={() => { setShowChangePassword(!showChangePassword); setIsEditMode(false); }}
//                   >
//                     <i className="bx bx-lock-alt"></i>
//                     Change Password
//                   </button>

//                   {/* Edit Profile Form */}
//                   {isEditMode && (
//                     <div className="edit-form-container">
//                       <h3 className="form-title">Edit Profile</h3>
//                       <form onSubmit={handleProfileUpdate} className="edit-profile-form">
//                         <div className="form-group">
//                           <label>Full Name</label>
//                           <input
//                             type="text"
//                             value={profileData.fullName}
//                             onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Qualification</label>
//                           <input
//                             type="text"
//                             value={profileData.qualification}
//                             onChange={e => setProfileData({ ...profileData, qualification: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Department</label>
//                           <input
//                             type="text"
//                             value={profileData.department}
//                             onChange={e => setProfileData({ ...profileData, department: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Email ID</label>
//                           <input
//                             type="email"
//                             value={profileData.email}
//                             onChange={e => setProfileData({ ...profileData, email: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Expertise</label>
//                           <input
//                             type="text"
//                             value={profileData.expertise}
//                             onChange={e => setProfileData({ ...profileData, expertise: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <button type="submit" className="submit-btn">
//                           <i className="bx bx-save"></i> Save Changes
//                         </button>
//                       </form>
//                     </div>
//                   )}

//                   {/* Change Password Form */}
//                   {showChangePassword && (
//                     <div className="edit-form-container">
//                       <h3 className="form-title">Change Password</h3>
//                       <form onSubmit={handlePasswordChange} className="edit-profile-form">
//                         <div className="form-group">
//                           <label>Current Password</label>
//                           <input
//                             type="password"
//                             value={passwords.current}
//                             onChange={e => setPasswords({ ...passwords, current: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>New Password</label>
//                           <input
//                             type="password"
//                             value={passwords.new}
//                             onChange={e => setPasswords({ ...passwords, new: e.target.value })}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label>Confirm New Password</label>
//                           <input
//                             type="password"
//                             value={passwords.confirm}
//                             onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
//                             required
//                           />
//                         </div>
//                         {passwordError && (
//                           <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '0' }}>{passwordError}</p>
//                         )}
//                         <button type="submit" className="submit-btn">
//                           <i className="bx bx-check"></i> Update Password
//                         </button>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Achievements Section — same as student */}
//               <div className="achievements-section">
//                 <div className="section-header">
//                   <h2 className="section-title">Achievements</h2>
//                   <button className="upload-achievement-btn" onClick={handleUploadAchievement}>
//                     <i className="bx bx-plus"></i> Upload Achievement
//                   </button>
//                 </div>

//                 <div className="achievements-grid">
//                   {achievements.map(achievement => (
//                     <div key={achievement.id} className="achievement-card">
//                       <div className="achievement-icon">
//                         <i className="bx bx-trophy"></i>
//                       </div>
//                       <h3 className="achievement-title">{achievement.title}</h3>
//                       <p className="achievement-date">
//                         <i className="bx bx-calendar"></i> {achievement.date}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Guide Footer */}
//               <GuideFooter
//                 onOpenSearch={() => onNavigate && onNavigate('dashboard')}
//                 onOpenChat={() => onNavigate && onNavigate('dashboard')}
//                 onNavigate={onNavigate}
//               />

//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GuideProfilePage;

import React, { useState } from 'react';
import GuideSidebar from './GuideSidebar';
import GuideFooter from './GuideFooter';
import '../styles/profile.css';

const GuideProfilePage = ({ userRole, username, onLogout, onNavigate, onOpenSearch, onOpenChat }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('guideProfilePageImage') || null);

  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Rajesh Kumar',
    qualification: 'Ph.D. Computer Science',
    department: 'Computer Science & Engineering',
    facultyId: 'FAC2021CS001',
    email: 'rajesh.kumar@mentormate.edu',
    expertise: 'Artificial Intelligence & Machine Learning'
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Best Faculty Award 2025', date: 'Jan 15, 2026' },
    { id: 2, title: 'Research Paper Published', date: 'Dec 20, 2025' },
    { id: 3, title: 'IEEE Conference Speaker', date: 'Nov 10, 2025' }
  ]);

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Guide Profile Updated:', profileData);
    setIsEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New passwords do not match!');
      return;
    }
    setPasswordError('');
    console.log('Password Changed');
    setShowChangePassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        localStorage.setItem('guideProfilePageImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAchievement = () => {
    const title = window.prompt('Enter achievement title:');
    if (title && title.trim()) {
      const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      setAchievements(prev => [
        ...prev,
        { id: Date.now(), title: title.trim(), date: today }
      ]);
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
          <div className="header-right">
            <div className="theme-selector">
              <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <i className="bx bx-palette"></i>
                <span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}>
                    <i className="bx bx-sun"></i> Light
                  </button>
                  <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}>
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
          <GuideSidebar
            userRole={userRole}
            username={username}
            onLogout={onLogout}
            onNavigate={onNavigate}
            currentView="profile"
            onSearchToggle={() => {}}
          />

          <main className="dashboard-content">
            <div className="profile-page-content">

              {/* Top Section */}
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
                    <label htmlFor="guide-profile-pic-upload" className="upload-pic-btn">
                      <i className="bx bx-camera"></i> Change Photo
                    </label>
                    <input
                      type="file"
                      id="guide-profile-pic-upload"
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
                      <span className="bio-label">Qualification:</span>
                      <span className="bio-value">{profileData.qualification}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Department:</span>
                      <span className="bio-value">{profileData.department}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Faculty ID:</span>
                      <span className="bio-value">{profileData.facultyId}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Email ID:</span>
                      <span className="bio-value">{profileData.email}</span>
                    </div>
                    <div className="bio-item">
                      <span className="bio-label">Expertise:</span>
                      <span className="bio-value">{profileData.expertise}</span>
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

                  {isEditMode && (
                    <div className="edit-form-container">
                      <h3 className="form-title">Edit Profile</h3>
                      <form onSubmit={handleProfileUpdate} className="edit-profile-form">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input type="text" value={profileData.fullName} onChange={e => setProfileData({ ...profileData, fullName: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>Qualification</label>
                          <input type="text" value={profileData.qualification} onChange={e => setProfileData({ ...profileData, qualification: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>Department</label>
                          <input type="text" value={profileData.department} onChange={e => setProfileData({ ...profileData, department: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>Email ID</label>
                          <input type="email" value={profileData.email} onChange={e => setProfileData({ ...profileData, email: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>Expertise</label>
                          <input type="text" value={profileData.expertise} onChange={e => setProfileData({ ...profileData, expertise: e.target.value })} required />
                        </div>
                        <button type="submit" className="submit-btn">
                          <i className="bx bx-save"></i> Save Changes
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
                          <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} required />
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} required />
                        </div>
                        {passwordError && (
                          <p style={{ color: '#e74c3c', fontSize: '0.85rem', margin: '0' }}>{passwordError}</p>
                        )}
                        <button type="submit" className="submit-btn">
                          <i className="bx bx-check"></i> Update Password
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements */}
              <div className="achievements-section">
                <div className="section-header">
                  <h2 className="section-title">Achievements</h2>
                  <button className="upload-achievement-btn" onClick={handleUploadAchievement}>
                    <i className="bx bx-plus"></i> Upload Achievement
                  </button>
                </div>
                <div className="achievements-grid">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="achievement-card">
                      <div className="achievement-icon">
                        <i className="bx bx-trophy"></i>
                      </div>
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <p className="achievement-date">
                        <i className="bx bx-calendar"></i> {achievement.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer — properly wired search and chat */}
              <GuideFooter
                onOpenSearch={onOpenSearch}
                onOpenChat={onOpenChat}
                onNavigate={onNavigate}
              />

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default GuideProfilePage;
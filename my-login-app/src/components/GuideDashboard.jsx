
// import React, { useState } from 'react';
// import GuideSidebar from './GuideSidebar';
// import GuideDashboardCards from './GuideDashboardCards';
// import GuideFooter from './GuideFooter';
// import ProjectManagement from './guideProjectManagement';
// import Attendance from './Attendance';
// import ScheduleMeeting from './ScheduleMeeting';
// import GuideProfilePage from './GuideProfilePage';
// import ChatPage from './ChatPage';
// import '../styles/guideFooter.css';
// import '../styles/guideFixed.css';

// const GuideDashboard = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchType, setSearchType] = useState('student');
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const [showChatPage, setShowChatPage] = useState(false);
//   const [currentView, setCurrentView] = useState('dashboard');

//   const facultyList = [
//     { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', department: 'Computer Science', expertise: 'AI & ML' },
//     { id: 2, name: 'Prof. Anjali Sharma', email: 'anjali@example.com', department: 'Electronics', expertise: 'IoT' },
//     { id: 3, name: 'Dr. Vikram Singh', email: 'vikram@example.com', department: 'Mechanical', expertise: 'Robotics' }
//   ];

//   const studentList = [
//     { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
//     { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
//     { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' }
//   ];

//   React.useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   React.useEffect(() => {
//     if (searchQuery.trim()) {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       const filtered = list.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredResults(filtered);
//     } else {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       setFilteredResults(list);
//     }
//   }, [searchQuery, searchType]);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleSearchToggle = (show) => {
//     setShowSearchBar(show);
//     if (show) {
//       setSearchQuery('');
//       setSearchType('student');
//       setFilteredResults(studentList);
//     }
//   };

//   const handlePersonSelect = (person) => {
//     setSelectedPerson(person);
//     setShowChatPage(true);
//   };

//   const handleCloseChatPage = () => setShowChatPage(false);
//   const handleOpenChatPage = () => { setSelectedPerson(null); setShowChatPage(true); };

//   const handleNavigate = (view) => {
//     setCurrentView(view);
//     if (view !== "dashboard") setShowSearchBar(false);
//   };

//   if (showChatPage) {
//     return <ChatPage onClose={handleCloseChatPage} preSelectedPerson={selectedPerson} />;
//   }

//   // STANDALONE PAGES - No Header/Sidebar/Footer
//   if (currentView === 'projectManagement') {
//     return <ProjectManagement onBack={() => handleNavigate('dashboard')} />;
//   }

//   if (currentView === 'attendance') {
//     return <Attendance onClose={() => handleNavigate('dashboard')} />;
//   }

//   if (currentView === 'schedule') {
//     return <ScheduleMeeting onBack={() => handleNavigate('dashboard')} />;
//   }

//   if (currentView === 'profile') {
//     return <GuideProfilePage userRole={userRole} username={username} onLogout={onLogout} onNavigate={handleNavigate} onOpenSearch={() => { handleNavigate("dashboard"); setTimeout(() => handleSearchToggle(true), 50); }} onOpenChat={() => { handleNavigate("dashboard"); setTimeout(() => setShowChatPage(true), 50); }} />;
//   }

//   // MAIN DASHBOARD - With Header/Sidebar/Footer
//   return (
//     <>
//       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
//                 <i className='bx bx-palette'></i><span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className='bx bx-sun'></i> Light</button>
//                   <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className='bx bx-moon'></i> Dark</button>
//                   <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className='bx bx-brush'></i> Default</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <GuideSidebar 
//             userRole={userRole} 
//             username={username} 
//             onLogout={onLogout} 
//             onNavigate={handleNavigate}
//             currentView={currentView}
//             showSearchBar={showSearchBar}
//             onSearchToggle={handleSearchToggle}
//           />

//           <main className="dashboard-content">
//             {showSearchBar && (
//               <div className="gs-search-section">
//                 <div className="gs-search-header">
//                   <h2 className="gs-search-title">Search</h2>
//                   <button className="gs-search-close" onClick={() => handleSearchToggle(false)}><i className="bx bx-x"></i></button>
//                 </div>
//                 <div className="gs-search-bar">
//                   <div className="gs-input-wrap">
//                     <i className="bx bx-search gs-search-icon"></i>
//                     <input
//                       type="text"
//                       className="gs-input"
//                       placeholder={searchType === "faculty" ? "Search Faculty..." : "Search Student..."}
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       autoFocus
//                     />
//                   </div>
//                   <select
//                     className="gs-dropdown"
//                     value={searchType}
//                     onChange={(e) => setSearchType(e.target.value)}
//                   >
//                     <option value="student">Student</option>
//                     <option value="faculty">Faculty</option>
//                   </select>
//                 </div>
//                 <div className="gs-results">
//                   {filteredResults.map(person => (
//                     <div key={person.id} className="gs-result-item" onClick={() => handlePersonSelect(person)}>
//                       <div className="gs-result-avatar">{person.name.charAt(0)}</div>
//                       <div className="gs-result-info">
//                         <h4>{person.name}</h4>
//                         <p>{person.email}</p>
//                         <span className="gs-result-meta">{searchType === "student" ? `${person.course} • ${person.year}` : `${person.department} • ${person.expertise}`}</span>
//                       </div>
//                       <i className="bx bx-chevron-right gs-result-arrow"></i>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             )}
//             {!showSearchBar && (
//               <>
//                 <GuideDashboardCards />

//                 <div className="guide-sections-grid">
//                   <div className="guide-section-card">
//                     <div className="section-title">
//                       <i className='bx bx-time-five'></i>
//                       <h3>Recent Activity</h3>
//                     </div>
//                     <div className="guide-activity-list">
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//                           <i className='bx bx-bulb'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>New Project Idea Submitted</h4>
//                           <p>Team Alpha submitted "AI Chatbot System"</p>
//                           <span className="time-badge">2 hours ago</span>
//                         </div>
//                       </div>
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
//                           <i className='bx bx-check-circle'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>Attendance Marked</h4>
//                           <p>Session completed for Team Beta</p>
//                           <span className="time-badge">5 hours ago</span>
//                         </div>
//                       </div>
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
//                           <i className='bx bx-calendar'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>Meeting Scheduled</h4>
//                           <p>Review with Team Gamma on March 25</p>
//                           <span className="time-badge">1 day ago</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="guide-section-card">
//                     <div className="section-title">
//                       <i className='bx bx-group'></i>
//                       <h3>Assigned Teams</h3>
//                     </div>
//                     <div className="guide-teams-list">
//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Alpha</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">AI Chatbot System</p>
//                         <div className="team-avatars">
//                           <div className="avatar">A</div>
//                           <div className="avatar">S</div>
//                           <div className="avatar">R</div>
//                           <div className="avatar-more">+2</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>75%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{width: '75%'}}></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Beta</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">E-Commerce Platform</p>
//                         <div className="team-avatars">
//                           <div className="avatar">P</div>
//                           <div className="avatar">K</div>
//                           <div className="avatar">M</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>45%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{width: '45%'}}></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Gamma</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">IoT Smart Home</p>
//                         <div className="team-avatars">
//                           <div className="avatar">N</div>
//                           <div className="avatar">V</div>
//                           <div className="avatar-more">+1</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>60%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{width: '60%'}}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <GuideFooter 
//                   onOpenSearch={() => handleSearchToggle(true)}
//                   onOpenChat={handleOpenChatPage}
//                   onNavigate={handleNavigate}
//                 />
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GuideDashboard;


// import React, { useState, useEffect } from 'react';
// import GuideSidebar from './GuideSidebar';
// import GuideDashboardCards from './GuideDashboardCards';
// import GuideFooter from './GuideFooter';
// import ChatPage from './ChatPage';
// import '../styles/guideFooter.css';
// import '../styles/guideFixed.css';
// const GuideDashboard = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchType, setSearchType] = useState('student');
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const [showChatPage, setShowChatPage] = useState(false);

//   const facultyList = [
//     { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', department: 'Computer Science', expertise: 'AI & ML' },
//     { id: 2, name: 'Prof. Anjali Sharma', email: 'anjali@example.com', department: 'Electronics', expertise: 'IoT' },
//     { id: 3, name: 'Dr. Vikram Singh', email: 'vikram@example.com', department: 'Mechanical', expertise: 'Robotics' }
//   ];

//   const studentList = [
//     { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
//     { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
//     { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' }
//   ];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       const filtered = list.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredResults(filtered);
//     } else {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       setFilteredResults(list);
//     }
//   }, [searchQuery, searchType]);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleSearchToggle = (show) => {
//     setShowSearchBar(show);
//     if (show) {
//       setSearchQuery('');
//       setSearchType('student');
//       setFilteredResults(studentList);
//     }
//   };

//   const handlePersonSelect = (person) => {
//     setSelectedPerson(person);
//     setShowChatPage(true);
//   };

//   const handleCloseChatPage = () => setShowChatPage(false);
//   const handleOpenChatPage = () => setShowChatPage(true);

//   if (showChatPage) {
//     return <ChatPage onClose={handleCloseChatPage} selectedPerson={selectedPerson} />;
//   }

//   return (
//     <>
//       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
//                 <i className='bx bx-palette'></i><span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className='bx bx-sun'></i> Light</button>
//                   <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className='bx bx-moon'></i> Dark</button>
//                   <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className='bx bx-brush'></i> Default</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <GuideSidebar userRole={userRole} username={username} onLogout={onLogout} onNavigate={onNavigate} onSearchToggle={handleSearchToggle} />

//           <main className="dashboard-content">
//             {showSearchBar && (
//               <div className="search-section active">
//                 <div className="search-header">
//                   <h2>Search</h2>
//                   <button className="close-search" onClick={() => handleSearchToggle(false)}><i className='bx bx-x'></i></button>
//                 </div>
//                 <div className="search-tabs">
//                   <button className={`search-tab ${searchType === 'student' ? 'active' : ''}`} onClick={() => setSearchType('student')}><i className='bx bx-user'></i> Students</button>
//                   <button className={`search-tab ${searchType === 'faculty' ? 'active' : ''}`} onClick={() => setSearchType('faculty')}><i className='bx bx-user-check'></i> Faculty</button>
//                 </div>
//                 <div className="search-input-wrapper">
//                   <i className='bx bx-search'></i>
//                   <input type="text" className="search-input" placeholder={`Search ${searchType}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
//                 </div>
//                 <div className="search-results">
//                   {filteredResults.map(person => (
//                     <div key={person.id} className="search-result-item" onClick={() => handlePersonSelect(person)}>
//                       <div className="result-avatar">{person.name.charAt(0)}</div>
//                       <div className="result-info">
//                         <h4>{person.name}</h4>
//                         <p>{person.email}</p>
//                         <span className="result-meta">{searchType === 'student' ? `${person.course} • ${person.year}` : `${person.department} • ${person.expertise}`}</span>
//                       </div>
//                       <i className='bx bx-chevron-right'></i>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {!showSearchBar && (
//               <>
//                 <div className="dashboard-welcome">
//                   <h2>Welcome back, {username || 'Guide'}!</h2>
//                   <p>Manage your students and projects</p>
//                 </div>

//                 <GuideDashboardCards />

//                 <div className="guide-sections-grid">
//                   <div className="guide-section-card">
//                     <div className="section-title">
//                       <i className='bx bx-time-five'></i>
//                       <h3>Recent Activity</h3>
//                     </div>
//                     <div className="guide-activity-list">
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//                           <i className='bx bx-bulb'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>New Project Idea Submitted</h4>
//                           <p>Team Alpha submitted "AI Chatbot System"</p>
//                           <span className="time-badge">2 hours ago</span>
//                         </div>
//                       </div>
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
//                           <i className='bx bx-check-circle'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>Attendance Marked</h4>
//                           <p>Session completed for Team Beta</p>
//                           <span className="time-badge">5 hours ago</span>
//                         </div>
//                       </div>
//                       <div className="guide-activity-item">
//                         <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
//                           <i className='bx bx-calendar'></i>
//                         </div>
//                         <div className="activity-text">
//                           <h4>Meeting Scheduled</h4>
//                           <p>Review with Team Gamma on March 25</p>
//                           <span className="time-badge">1 day ago</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="guide-section-card">
//                     <div className="section-title">
//                       <i className='bx bx-group'></i>
//                       <h3>Assigned Teams</h3>
//                     </div>
//                     <div className="guide-teams-list">
//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Alpha</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">AI Chatbot System</p>
//                         <div className="team-avatars">
//                           <div className="avatar">A</div>
//                           <div className="avatar">S</div>
//                           <div className="avatar">R</div>
//                           <div className="avatar-more">+2</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>75%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{ width: '75%' }}></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Beta</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">E-Commerce Platform</p>
//                         <div className="team-avatars">
//                           <div className="avatar">P</div>
//                           <div className="avatar">K</div>
//                           <div className="avatar">M</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>45%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{ width: '45%' }}></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-team-card">
//                         <div className="team-header">
//                           <h4>Team Gamma</h4>
//                           <span className="team-badge">Active</span>
//                         </div>
//                         <p className="team-desc">IoT Smart Home</p>
//                         <div className="team-avatars">
//                           <div className="avatar">N</div>
//                           <div className="avatar">V</div>
//                           <div className="avatar-more">+1</div>
//                         </div>
//                         <div className="team-progress-box">
//                           <div className="progress-info">
//                             <span>Progress</span>
//                             <strong>60%</strong>
//                           </div>
//                           <div className="progress-track">
//                             <div className="progress-bar-fill" style={{ width: '60%' }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* New Guide Footer - Inside Content Area */}
//                 <GuideFooter 
//                   onOpenSearch={() => handleSearchToggle(true)}
//                   onOpenChat={handleOpenChatPage}
//                   onNavigate={onNavigate}
//                 />
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GuideDashboard;

// import React, { useState, useEffect } from 'react';
// import GuideSidebar from './GuideSidebar';
// import GuideDashboardCards from './GuideDashboardCards';
// import GuideFooter from './GuideFooter';
// import ProjectManagement from './guideProjectManagement';
// import ChatPage from './ChatPage';
// import '../styles/guideFooter.css';
// import '../styles/guideFixed.css';

// const GuideDashboard = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchType, setSearchType] = useState('student');
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const [showChatPage, setShowChatPage] = useState(false);
//   const [currentView, setCurrentView] = useState('dashboard');

//   const facultyList = [
//     { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', department: 'Computer Science', expertise: 'AI & ML' },
//     { id: 2, name: 'Prof. Anjali Sharma', email: 'anjali@example.com', department: 'Electronics', expertise: 'IoT' },
//     { id: 3, name: 'Dr. Vikram Singh', email: 'vikram@example.com', department: 'Mechanical', expertise: 'Robotics' }
//   ];

//   const studentList = [
//     { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
//     { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
//     { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' }
//   ];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       const filtered = list.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredResults(filtered);
//     } else {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       setFilteredResults(list);
//     }
//   }, [searchQuery, searchType]);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleSearchToggle = (show) => {
//     setShowSearchBar(show);
//     if (show) {
//       setSearchQuery('');
//       setSearchType('student');
//       setFilteredResults(studentList);
//     }
//   };

//   const handlePersonSelect = (person) => {
//     setSelectedPerson(person);
//     setShowChatPage(true);
//   };

//   const handleCloseChatPage = () => setShowChatPage(false);
//   const handleOpenChatPage = () => setShowChatPage(true);

//   const handleNavigate = (view) => {
//     setCurrentView(view);
//     setShowSearchBar(false);
//   };

//   if (showChatPage) {
//     return <ChatPage onClose={handleCloseChatPage} selectedPerson={selectedPerson} />;
//   }

//   return (
//     <>
//       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
//                 <i className='bx bx-palette'></i><span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className='bx bx-sun'></i> Light</button>
//                   <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className='bx bx-moon'></i> Dark</button>
//                   <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className='bx bx-brush'></i> Default</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <GuideSidebar 
//             userRole={userRole} 
//             username={username} 
//             onLogout={onLogout} 
//             onNavigate={handleNavigate} 
//             onSearchToggle={handleSearchToggle} 
//           />

//           <main className="dashboard-content">
//             {currentView === 'projectManagement' ? (
//               <ProjectManagement onBack={() => handleNavigate('dashboard')} />
//             ) : (
//               <>
//                 {showSearchBar && (
//                   <div className="search-section active">
//                     <div className="search-header">
//                       <h2>Search</h2>
//                       <button className="close-search" onClick={() => handleSearchToggle(false)}><i className='bx bx-x'></i></button>
//                     </div>
//                     <div className="search-tabs">
//                       <button className={`search-tab ${searchType === 'student' ? 'active' : ''}`} onClick={() => setSearchType('student')}><i className='bx bx-user'></i> Students</button>
//                       <button className={`search-tab ${searchType === 'faculty' ? 'active' : ''}`} onClick={() => setSearchType('faculty')}><i className='bx bx-user-check'></i> Faculty</button>
//                     </div>
//                     <div className="search-input-wrapper">
//                       <i className='bx bx-search'></i>
//                       <input type="text" className="search-input" placeholder={`Search ${searchType}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
//                     </div>
//                     <div className="search-results">
//                       {filteredResults.map(person => (
//                         <div key={person.id} className="search-result-item" onClick={() => handlePersonSelect(person)}>
//                           <div className="result-avatar">{person.name.charAt(0)}</div>
//                           <div className="result-info">
//                             <h4>{person.name}</h4>
//                             <p>{person.email}</p>
//                             <span className="result-meta">{searchType === 'student' ? `${person.course} • ${person.year}` : `${person.department} • ${person.expertise}`}</span>
//                           </div>
//                           <i className='bx bx-chevron-right'></i>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {!showSearchBar && (
//                   <>
//                     <div className="dashboard-welcome">
//                       <h2>Welcome back, {username || 'Guide'}!</h2>
//                       <p>Manage your students and projects</p>
//                     </div>

//                     <GuideDashboardCards />

//                     <div className="guide-sections-grid">
//                       <div className="guide-section-card">
//                         <div className="section-title">
//                           <i className='bx bx-time-five'></i>
//                           <h3>Recent Activity</h3>
//                         </div>
//                         <div className="guide-activity-list">
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//                               <i className='bx bx-bulb'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>New Project Idea Submitted</h4>
//                               <p>Team Alpha submitted "AI Chatbot System"</p>
//                               <span className="time-badge">2 hours ago</span>
//                             </div>
//                           </div>
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
//                               <i className='bx bx-check-circle'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>Attendance Marked</h4>
//                               <p>Session completed for Team Beta</p>
//                               <span className="time-badge">5 hours ago</span>
//                             </div>
//                           </div>
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
//                               <i className='bx bx-calendar'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>Meeting Scheduled</h4>
//                               <p>Review with Team Gamma on March 25</p>
//                               <span className="time-badge">1 day ago</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-section-card">
//                         <div className="section-title">
//                           <i className='bx bx-group'></i>
//                           <h3>Assigned Teams</h3>
//                         </div>
//                         <div className="guide-teams-list">
//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Alpha</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">AI Chatbot System</p>
//                             <div className="team-avatars">
//                               <div className="avatar">A</div>
//                               <div className="avatar">S</div>
//                               <div className="avatar">R</div>
//                               <div className="avatar-more">+2</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>75%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '75%' }}></div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Beta</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">E-Commerce Platform</p>
//                             <div className="team-avatars">
//                               <div className="avatar">P</div>
//                               <div className="avatar">K</div>
//                               <div className="avatar">M</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>45%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '45%' }}></div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Gamma</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">IoT Smart Home</p>
//                             <div className="team-avatars">
//                               <div className="avatar">N</div>
//                               <div className="avatar">V</div>
//                               <div className="avatar-more">+1</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>60%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '60%' }}></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <GuideFooter 
//                       onOpenSearch={() => handleSearchToggle(true)}
//                       onOpenChat={handleOpenChatPage}
//                       onNavigate={onNavigate}
//                     />
//                   </>
//                 )}
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GuideDashboard;

// import React, { useState, useEffect } from 'react';
// import GuideSidebar from './GuideSidebar';
// import GuideDashboardCards from './GuideDashboardCards';
// import GuideFooter from './GuideFooter';
// import ProjectManagement from './guideProjectManagement';
// import Attendance from './Attendance';
// import ChatPage from './ChatPage';
// import '../styles/guideFooter.css';
// import '../styles/guideFixed.css';

// const GuideDashboard = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState('default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);
//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchType, setSearchType] = useState('student');
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedPerson, setSelectedPerson] = useState(null);
//   const [showChatPage, setShowChatPage] = useState(false);
//   const [currentView, setCurrentView] = useState('dashboard');

//   const facultyList = [
//     { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', department: 'Computer Science', expertise: 'AI & ML' },
//     { id: 2, name: 'Prof. Anjali Sharma', email: 'anjali@example.com', department: 'Electronics', expertise: 'IoT' },
//     { id: 3, name: 'Dr. Vikram Singh', email: 'vikram@example.com', department: 'Mechanical', expertise: 'Robotics' }
//   ];

//   const studentList = [
//     { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
//     { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
//     { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' }
//   ];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       const filtered = list.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredResults(filtered);
//     } else {
//       const list = searchType === 'faculty' ? facultyList : studentList;
//       setFilteredResults(list);
//     }
//   }, [searchQuery, searchType]);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleSearchToggle = (show) => {
//     setShowSearchBar(show);
//     if (show) {
//       setSearchQuery('');
//       setSearchType('student');
//       setFilteredResults(studentList);
//     }
//   };

//   const handlePersonSelect = (person) => {
//     setSelectedPerson(person);
//     setShowChatPage(true);
//   };

//   const handleCloseChatPage = () => setShowChatPage(false);
//   const handleOpenChatPage = () => setShowChatPage(true);

//   const handleNavigate = (view) => {
//     setCurrentView(view);
//     setShowSearchBar(false);
//   };

//   if (showChatPage) {
//     return <ChatPage onClose={handleCloseChatPage} selectedPerson={selectedPerson} />;
//   }

//   return (
//     <>
//       <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
//       <div className="dashboard-wrapper">
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
//                 <i className='bx bx-palette'></i><span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className='bx bx-sun'></i> Light</button>
//                   <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className='bx bx-moon'></i> Dark</button>
//                   <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className='bx bx-brush'></i> Default</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <GuideSidebar 
//             userRole={userRole} 
//             username={username} 
//             onLogout={onLogout} 
//             onNavigate={handleNavigate} 
//             onSearchToggle={handleSearchToggle} 
//           />

//           <main className="dashboard-content">
//             {currentView === 'projectManagement' ? (
//               <ProjectManagement onBack={() => handleNavigate('dashboard')} />
//             ) : currentView === 'attendance' ? (
//               <Attendance onBack={() => handleNavigate('dashboard')} />
//             ) : (
//               <>
//                 {showSearchBar && (
//                   <div className="search-section active">
//                     <div className="search-header">
//                       <h2>Search</h2>
//                       <button className="close-search" onClick={() => handleSearchToggle(false)}><i className='bx bx-x'></i></button>
//                     </div>
//                     <div className="search-tabs">
//                       <button className={`search-tab ${searchType === 'student' ? 'active' : ''}`} onClick={() => setSearchType('student')}><i className='bx bx-user'></i> Students</button>
//                       <button className={`search-tab ${searchType === 'faculty' ? 'active' : ''}`} onClick={() => setSearchType('faculty')}><i className='bx bx-user-check'></i> Faculty</button>
//                     </div>
//                     <div className="search-input-wrapper">
//                       <i className='bx bx-search'></i>
//                       <input type="text" className="search-input" placeholder={`Search ${searchType}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
//                     </div>
//                     <div className="search-results">
//                       {filteredResults.map(person => (
//                         <div key={person.id} className="search-result-item" onClick={() => handlePersonSelect(person)}>
//                           <div className="result-avatar">{person.name.charAt(0)}</div>
//                           <div className="result-info">
//                             <h4>{person.name}</h4>
//                             <p>{person.email}</p>
//                             <span className="result-meta">{searchType === 'student' ? `${person.course} • ${person.year}` : `${person.department} • ${person.expertise}`}</span>
//                           </div>
//                           <i className='bx bx-chevron-right'></i>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {!showSearchBar && (
//                   <>
//                     <div className="dashboard-welcome">
//                       <h2>Welcome back, {username || 'Guide'}!</h2>
//                       <p>Manage your students and projects</p>
//                     </div>

//                     <GuideDashboardCards />

//                     <div className="guide-sections-grid">
//                       <div className="guide-section-card">
//                         <div className="section-title">
//                           <i className='bx bx-time-five'></i>
//                           <h3>Recent Activity</h3>
//                         </div>
//                         <div className="guide-activity-list">
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//                               <i className='bx bx-bulb'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>New Project Idea Submitted</h4>
//                               <p>Team Alpha submitted "AI Chatbot System"</p>
//                               <span className="time-badge">2 hours ago</span>
//                             </div>
//                           </div>
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
//                               <i className='bx bx-check-circle'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>Attendance Marked</h4>
//                               <p>Session completed for Team Beta</p>
//                               <span className="time-badge">5 hours ago</span>
//                             </div>
//                           </div>
//                           <div className="guide-activity-item">
//                             <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
//                               <i className='bx bx-calendar'></i>
//                             </div>
//                             <div className="activity-text">
//                               <h4>Meeting Scheduled</h4>
//                               <p>Review with Team Gamma on March 25</p>
//                               <span className="time-badge">1 day ago</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="guide-section-card">
//                         <div className="section-title">
//                           <i className='bx bx-group'></i>
//                           <h3>Assigned Teams</h3>
//                         </div>
//                         <div className="guide-teams-list">
//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Alpha</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">AI Chatbot System</p>
//                             <div className="team-avatars">
//                               <div className="avatar">A</div>
//                               <div className="avatar">S</div>
//                               <div className="avatar">R</div>
//                               <div className="avatar-more">+2</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>75%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '75%' }}></div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Beta</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">E-Commerce Platform</p>
//                             <div className="team-avatars">
//                               <div className="avatar">P</div>
//                               <div className="avatar">K</div>
//                               <div className="avatar">M</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>45%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '45%' }}></div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="guide-team-card">
//                             <div className="team-header">
//                               <h4>Team Gamma</h4>
//                               <span className="team-badge">Active</span>
//                             </div>
//                             <p className="team-desc">IoT Smart Home</p>
//                             <div className="team-avatars">
//                               <div className="avatar">N</div>
//                               <div className="avatar">V</div>
//                               <div className="avatar-more">+1</div>
//                             </div>
//                             <div className="team-progress-box">
//                               <div className="progress-info">
//                                 <span>Progress</span>
//                                 <strong>60%</strong>
//                               </div>
//                               <div className="progress-track">
//                                 <div className="progress-bar-fill" style={{ width: '60%' }}></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <GuideFooter 
//                       onOpenSearch={() => handleSearchToggle(true)}
//                       onOpenChat={handleOpenChatPage}
//                       onNavigate={onNavigate}
//                     />
//                   </>
//                 )}
//               </>
//             )}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GuideDashboard;

import React, { useState } from 'react';
import GuideSidebar from './GuideSidebar';
import GuideDashboardCards from './GuideDashboardCards';
import GuideFooter from './GuideFooter';
import ProjectManagement from './guideProjectManagement';
import Attendance from './Attendance';
import ScheduleMeeting from './ScheduleMeeting';
import AboutPage from './AboutPage';
import GuideProfilePage from './GuideProfilePage';
import ChatPage from './ChatPage';
import '../styles/guideFooter.css';
import '../styles/guideFixed.css';

const GuideDashboard = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('student');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showChatPage, setShowChatPage] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const facultyList = [
    { id: 1, name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', department: 'Computer Science', expertise: 'AI & ML' },
    { id: 2, name: 'Prof. Anjali Sharma', email: 'anjali@example.com', department: 'Electronics', expertise: 'IoT' },
    { id: 3, name: 'Dr. Vikram Singh', email: 'vikram@example.com', department: 'Mechanical', expertise: 'Robotics' }
  ];

  const studentList = [
    { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
    { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
    { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' }
  ];

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const list = searchType === 'faculty' ? facultyList : studentList;
      const filtered = list.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      const list = searchType === 'faculty' ? facultyList : studentList;
      setFilteredResults(list);
    }
  }, [searchQuery, searchType]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleSearchToggle = (show) => {
    setShowSearchBar(show);
    if (show) {
      setSearchQuery('');
      setSearchType('student');
      setFilteredResults(studentList);
    }
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setShowChatPage(true);
  };

  const handleCloseChatPage = () => setShowChatPage(false);
  const handleOpenChatPage = () => { setSelectedPerson(null); setShowChatPage(true); };

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view !== "dashboard") setShowSearchBar(false);
  };

  if (showChatPage) {
    return <ChatPage onClose={handleCloseChatPage} preSelectedPerson={selectedPerson} />;
  }

  // STANDALONE PAGES - No Header/Sidebar/Footer
  if (currentView === 'projectManagement') {
    return <ProjectManagement onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'attendance') {
    return <Attendance onClose={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'schedule') {
    return <ScheduleMeeting onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'about') {
    return (
      <AboutPage
        userRole={userRole}
        username={username}
        onLogout={onLogout}
        onNavigate={handleNavigate}
        SidebarComponent={GuideSidebar}
        sidebarProps={{
          userRole, username,
          onLogout,
          onNavigate: handleNavigate,
          currentView: 'about',
          onSearchToggle: () => {}
        }}
      />
    );
  }

  if (currentView === 'profile') {
    return <GuideProfilePage userRole={userRole} username={username} onLogout={onLogout} onNavigate={handleNavigate} onOpenSearch={() => { handleNavigate("dashboard"); setTimeout(() => handleSearchToggle(true), 50); }} onOpenChat={() => { handleNavigate("dashboard"); setTimeout(() => setShowChatPage(true), 50); }} />;
  }

  // MAIN DASHBOARD - With Header/Sidebar/Footer
  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <i className='bx bx-palette'></i><span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button className={theme === 'light' ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className='bx bx-sun'></i> Light</button>
                  <button className={theme === 'dark' ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className='bx bx-moon'></i> Dark</button>
                  <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className='bx bx-brush'></i> Default</button>
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
            onNavigate={handleNavigate}
            currentView={currentView}
            showSearchBar={showSearchBar}
            onSearchToggle={handleSearchToggle}
          />

          <main className="dashboard-content">
            {showSearchBar && (
              <div className="gs-search-section">
                <div className="gs-search-header">
                  <h2 className="gs-search-title">Search</h2>
                  <button className="gs-search-close" onClick={() => handleSearchToggle(false)}><i className="bx bx-x"></i></button>
                </div>
                <div className="gs-search-bar">
                  <div className="gs-input-wrap">
                    <i className="bx bx-search gs-search-icon"></i>
                    <input
                      type="text"
                      className="gs-input"
                      placeholder={searchType === "faculty" ? "Search Faculty..." : "Search Student..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <select
                    className="gs-dropdown"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
                <div className="gs-results">
                  {filteredResults.map(person => (
                    <div key={person.id} className="gs-result-item" onClick={() => handlePersonSelect(person)}>
                      <div className="gs-result-avatar">{person.name.charAt(0)}</div>
                      <div className="gs-result-info">
                        <h4>{person.name}</h4>
                        <p>{person.email}</p>
                        <span className="gs-result-meta">{searchType === "student" ? `${person.course} • ${person.year}` : `${person.department} • ${person.expertise}`}</span>
                      </div>
                      <i className="bx bx-chevron-right gs-result-arrow"></i>
                    </div>
                  ))}
                </div>
              </div>

            )}
            {!showSearchBar && (
              <>
                

                <GuideDashboardCards />

                <div className="guide-sections-grid">
                  <div className="guide-section-card">
                    <div className="section-title">
                      <i className='bx bx-time-five'></i>
                      <h3>Recent Activity</h3>
                    </div>
                    <div className="guide-activity-list">
                      <div className="guide-activity-item">
                        <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                          <i className='bx bx-bulb'></i>
                        </div>
                        <div className="activity-text">
                          <h4>New Project Idea Submitted</h4>
                          <p>Team Alpha submitted "AI Chatbot System"</p>
                          <span className="time-badge">2 hours ago</span>
                        </div>
                      </div>
                      <div className="guide-activity-item">
                        <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                          <i className='bx bx-check-circle'></i>
                        </div>
                        <div className="activity-text">
                          <h4>Attendance Marked</h4>
                          <p>Session completed for Team Beta</p>
                          <span className="time-badge">5 hours ago</span>
                        </div>
                      </div>
                      <div className="guide-activity-item">
                        <div className="activity-icon-circle" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                          <i className='bx bx-calendar'></i>
                        </div>
                        <div className="activity-text">
                          <h4>Meeting Scheduled</h4>
                          <p>Review with Team Gamma on March 25</p>
                          <span className="time-badge">1 day ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="guide-section-card">
                    <div className="section-title">
                      <i className='bx bx-group'></i>
                      <h3>Assigned Teams</h3>
                    </div>
                    <div className="guide-teams-list">
                      <div className="guide-team-card">
                        <div className="team-header">
                          <h4>Team Alpha</h4>
                          <span className="team-badge">Active</span>
                        </div>
                        <p className="team-desc">AI Chatbot System</p>
                        <div className="team-avatars">
                          <div className="avatar">A</div>
                          <div className="avatar">S</div>
                          <div className="avatar">R</div>
                          <div className="avatar-more">+2</div>
                        </div>
                        <div className="team-progress-box">
                          <div className="progress-info">
                            <span>Progress</span>
                            <strong>75%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-bar-fill" style={{width: '75%'}}></div>
                          </div>
                        </div>
                      </div>

                      <div className="guide-team-card">
                        <div className="team-header">
                          <h4>Team Beta</h4>
                          <span className="team-badge">Active</span>
                        </div>
                        <p className="team-desc">E-Commerce Platform</p>
                        <div className="team-avatars">
                          <div className="avatar">P</div>
                          <div className="avatar">K</div>
                          <div className="avatar">M</div>
                        </div>
                        <div className="team-progress-box">
                          <div className="progress-info">
                            <span>Progress</span>
                            <strong>45%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-bar-fill" style={{width: '45%'}}></div>
                          </div>
                        </div>
                      </div>

                      <div className="guide-team-card">
                        <div className="team-header">
                          <h4>Team Gamma</h4>
                          <span className="team-badge">Active</span>
                        </div>
                        <p className="team-desc">IoT Smart Home</p>
                        <div className="team-avatars">
                          <div className="avatar">N</div>
                          <div className="avatar">V</div>
                          <div className="avatar-more">+1</div>
                        </div>
                        <div className="team-progress-box">
                          <div className="progress-info">
                            <span>Progress</span>
                            <strong>60%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-bar-fill" style={{width: '60%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <GuideFooter 
                  onOpenSearch={() => handleSearchToggle(true)}
                  onOpenChat={handleOpenChatPage}
                  onNavigate={handleNavigate}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default GuideDashboard;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardCards from './DashboardCards';
import TaskTable from './TaskTable';
import ProjectStatus from './ProjectStatus';
import AssignedProject from './AssignedProject';
import UploadedFiles from './UploadedFiles';
import FooterIcons from './FooterIcons';

const Dashboard = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('student');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showChatBox, setShowChatBox] = useState(false);

  // Sample data
  const facultyList = [
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'Computer Science', expertise: 'AI & ML' },
    { id: 2, name: 'Prof. Anjali Sharma', department: 'Electronics', expertise: 'IoT' },
    { id: 3, name: 'Dr. Vikram Singh', department: 'Mechanical', expertise: 'Robotics' },
    { id: 4, name: 'Prof. Priya Mehta', department: 'Computer Science', expertise: 'Web Development' },
    { id: 5, name: 'Dr. Amit Patel', department: 'Information Technology', expertise: 'Cybersecurity' }
  ];

  const studentList = [
    { id: 1, name: 'Arjun Verma', course: 'B.Tech CS', year: '3rd Year', domain: 'Web Development' },
    { id: 2, name: 'Sneha Reddy', course: 'B.Tech IT', year: '2nd Year', domain: 'Data Science' },
    { id: 3, name: 'Rahul Joshi', course: 'B.Tech EC', year: '4th Year', domain: 'IoT' },
    { id: 4, name: 'Priya Desai', course: 'B.Tech CS', year: '3rd Year', domain: 'AI & ML' },
    { id: 5, name: 'Karan Malhotra', course: 'B.Tech ME', year: '2nd Year', domain: 'Robotics' }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    // Filter results based on search query
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
    setShowChatBox(true);
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
            onSearchToggle={handleSearchToggle}
          />

          <main className="dashboard-content">
            {/* Search Bar - Only visible when Search is clicked */}
            {showSearchBar && (
              <div className="dashboard-search-section">
                <div className="search-bar-container">
                  <div className="search-input-wrapper">
                    <i className='bx bx-search'></i>
                    <input 
                      type="text"
                      placeholder={`Search ${searchType === 'faculty' ? 'Faculty' : 'Student'}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select 
                    className="search-type-select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>

                {/* Search Results */}
                <div className="search-results-container">
                  {filteredResults.map(person => (
                    <div 
                      key={person.id} 
                      className="search-result-item"
                      onClick={() => handlePersonSelect(person)}
                    >
                      <div className="search-result-icon">
                        <i className={`bx ${searchType === 'faculty' ? 'bx-user-circle' : 'bx-user'}`}></i>
                      </div>
                      <div className="search-result-info">
                        <p className="search-result-name">{person.name}</p>
                        <p className="search-result-detail">
                          {searchType === 'faculty' 
                            ? `${person.department} • ${person.expertise}`
                            : `${person.course} • ${person.domain}`
                          }
                        </p>
                      </div>
                      <i className='bx bx-message-dots search-result-action'></i>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Box */}
            {showChatBox && selectedPerson && (
              <div className="chat-box-overlay" onClick={() => setShowChatBox(false)}>
                <div className="chat-box" onClick={(e) => e.stopPropagation()}>
                  <div className="chat-box-header">
                    <div className="chat-header-info">
                      <i className='bx bx-user-circle'></i>
                      <span>{selectedPerson.name}</span>
                    </div>
                    <button className="chat-close-btn" onClick={() => setShowChatBox(false)}>
                      <i className='bx bx-x'></i>
                    </button>
                  </div>
                  <div className="chat-box-body">
                    <p className="chat-placeholder">Start your conversation with {selectedPerson.name}</p>
                  </div>
                  <div className="chat-box-footer">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="chat-input"
                    />
                    <button className="chat-send-btn">
                      <i className='bx bx-send'></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <DashboardCards />
            <TaskTable />
            <ProjectStatus />
            <AssignedProject />
            <UploadedFiles />
            <FooterIcons />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
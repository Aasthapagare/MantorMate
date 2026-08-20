import React, { useEffect, useState } from 'react';
import GuideSidebar from './GuideSidebar';
import GuideDashboardCards from './GuideDashboardCards';
import GuideFooter from './GuideFooter';
import ProjectManagement from './guideProjectManagement';
import Attendance from './Attendance';
import ScheduleMeeting from './ScheduleMeeting';
import ChatPage from './ChatPage';
import GuideProfile from './GuideProfile';
import MeetingRoom from './MeetingRoom';
import GuideDocuments from './GuideDocuments';
import NotificationPage from './NotificationPage';
import { getUserInfo } from '../services/authService';
import '../styles/guideFooter.css';
import '../styles/guideFixed.css';

const GuideDashboard = ({ userRole, username, onLogout }) => {
  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showChatPage, setShowChatPage] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [guideInfo, setGuideInfo] = useState(getUserInfo());

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    setGuideInfo(getUserInfo());
  }, [username, userRole]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleCloseChatPage = () => setShowChatPage(false);
  const handleOpenChatPage = () => {
    setSelectedPerson({
      id: guideInfo.userId || 'guide',
      name: guideInfo.name || username || 'Guide',
      email: 'Guide Chat'
    });
    setShowChatPage(true);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleNotificationOpen = (notification) => {
    const notificationType = (notification?.type || '').toString().trim().toUpperCase();

    if (notificationType === 'CHAT') {
      handleOpenChatPage();
      return;
    }

    if (notificationType === 'MEETING_REQUEST' || notificationType === 'MEETING_APPROVED') {
      setCurrentView('schedule');
    }
  };

  if (showChatPage) {
    return <ChatPage onClose={handleCloseChatPage} selectedPerson={selectedPerson} />;
  }

  if (currentView === 'projectManagement') {
    return <ProjectManagement onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'attendance') {
    return <Attendance onClose={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'schedule') {
    return <ScheduleMeeting onBack={() => handleNavigate('dashboard')} onOpenMeetingRoom={() => handleNavigate('meetingRoom')} />;
  }

  if (currentView === 'profile') {
    return (
      <GuideProfile
        onBack={() => handleNavigate('dashboard')}
        onNavigate={handleNavigate}
        onLogout={onLogout}
        userRole={guideInfo.role || userRole}
        username={guideInfo.name || username}
      />
    );
  }

  if (currentView === 'documents') {
    return <GuideDocuments onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'notification') {
    return (
      <NotificationPage
        roleLabel={guideInfo.role || userRole || 'Guide'}
        onBack={() => handleNavigate('dashboard')}
        onNotificationOpen={handleNotificationOpen}
      />
    );
  }

  if (currentView === 'meetingRoom') {
    return <MeetingRoom username={guideInfo.name || username} onBack={() => handleNavigate('schedule')} />;
  }

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
            userRole={guideInfo.role || userRole}
            username={guideInfo.name || username}
            onLogout={onLogout}
            onNavigate={handleNavigate}
            currentView={currentView}
          />

          <main className="dashboard-content">
            <div className="dashboard-welcome dashboard-welcome-hero">
              <div className="dashboard-welcome-copy">
                <span className="dashboard-welcome-kicker">Guide Workspace</span>
                <h2>Welcome back, {guideInfo.name || username || 'Guide'}!</h2>
                <p>Track assigned groups, manage attendance, and review project progress from one clean dashboard.</p>
              </div>
              <div className="dashboard-welcome-meta">
                <div className="welcome-chip strong">
                  <i className='bx bx-id-card'></i>
                  <span>{guideInfo.userId || 'Guide ID'}</span>
                </div>
                <div className="welcome-chip">
                  <i className='bx bx-shield-quarter'></i>
                  <span>{guideInfo.role || 'GUIDE'}</span>
                </div>
                <div className={`welcome-chip ${guideInfo.token ? 'success' : 'muted'}`}>
                  <i className='bx bx-check-circle'></i>
                  <span>{guideInfo.token ? 'Authenticated Session' : 'Session Unavailable'}</span>
                </div>
              </div>
            </div>

            <GuideDashboardCards />

            <GuideFooter
              onOpenChat={handleOpenChatPage}
              onNavigate={handleNavigate}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default GuideDashboard;

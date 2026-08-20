import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import DashboardCards from './DashboardCards';
import TaskTable from './TaskTable';
import UpcomingMeetingCard from './UpcomingMeetingCard';
import UploadedFiles from './UploadedFiles';
import FooterIcons from './FooterIcons';
import ChatPage from './ChatPage';
import meetingService from '../services/meetingService';
import { getUpcomingMeeting, normalizeNumericId } from '../utils/meetingHelpers';

const Dashboard = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const [upcomingMeeting, setUpcomingMeeting] = useState(null);
  const [meetingLoading, setMeetingLoading] = useState(true);

  useEffect(() => {
    const normalizedRole = userRole ? userRole.toString().trim().toUpperCase() : '';
    if (normalizedRole === 'ADMIN') {
      onNavigate('admin');
    }
  }, [userRole, onNavigate]);

  useEffect(() => {
    const openChat = localStorage.getItem('openChat');
    if (openChat === 'true') {
      localStorage.removeItem('openChat');
      handleOpenChatPage();
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const loadUpcomingMeeting = async () => {
      try {
        setMeetingLoading(true);
        const studentId = normalizeNumericId(localStorage.getItem('userId'));
        if (!studentId) {
          setUpcomingMeeting(null);
          return;
        }

        const meetings = await meetingService.getStudentApprovedMeetings(studentId);
        setUpcomingMeeting(getUpcomingMeeting(Array.isArray(meetings) ? meetings : []));
      } catch (error) {
        console.error('Upcoming meeting load error:', error);
        setUpcomingMeeting(null);
      } finally {
        setMeetingLoading(false);
      }
    };

    loadUpcomingMeeting();
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleOpenChatPage = () => {
    setShowChatPage(true);
  };

  const handleCloseChatPage = () => {
    setShowChatPage(false);
  };

  const handleOpenMeetingSchedule = () => {
    onNavigate?.('meetingScheduler');
  };

  const handleJoinMeeting = (meeting) => {
    if (!meeting?.meetingLink) {
      return;
    }
    window.open(meeting.meetingLink, '_blank', 'noopener,noreferrer');
  };

  if (showChatPage) {
    return (
      <ChatPage
        onClose={handleCloseChatPage}
      />
    );
  }

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
            currentPage="dashboard"
            isSearchOpen={false}
          />

          <main className="dashboard-content">
            <DashboardCards />
            <TaskTable />
            <UpcomingMeetingCard
              meeting={upcomingMeeting}
              loading={meetingLoading}
              roleLabel="Guide session"
              onOpenSchedule={handleOpenMeetingSchedule}
              onJoin={handleJoinMeeting}
            />
            <UploadedFiles />
            <FooterIcons
              onOpenChat={handleOpenChatPage}
              onNavigate={onNavigate}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

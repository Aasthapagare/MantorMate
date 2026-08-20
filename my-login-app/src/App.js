import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TogglePanel from './components/TogglePanel';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import ProjectManagement from './components/ProjectManagement';
import GroupFormation from './components/GroupFormation';
import GuideSelection from './components/GuideSelection';
import ProjectIdeaSubmission from './components/ProjectIdeaSubmission';
import MeetingScheduler from './components/MeetingScheduler';
import MeetingRoom from './components/MeetingRoom';
import AdminPanel from './components/AdminPanel';
import GuideDashboard from './components/GuideDashboard';
import NotificationPage from './components/NotificationPage';
import ChatPage from './components/ChatPage';
import './styles/style.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/admin.css';
import './styles/chatpage.css';
import './styles/groupDetails.css';
import './styles/attendance.css';
import './styles/assignedGroups.css';
import './styles/scheduleMeeting.css';
import './styles/notification.css';

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userData, setUserData] = useState({
    username: '',
    role: ''
  });

  // Apply theme on app mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);
  const handleRegisterSuccess = () => setIsActive(false);

  // ✅ UPDATED LOGIN SUCCESS FUNCTION
  const handleLoginSuccess = (userId, role, name) => {
    const normalizedRole = role ? role.toString().trim().toUpperCase() : '';
    console.log("Login success:", normalizedRole);

    setUserData({
      username: name,
      role: normalizedRole
    });

    setIsLoggedIn(true);

    // 🔥 ROLE BASED PAGE SET
    if (normalizedRole === "ADMIN") {
      setCurrentPage("admin");
    } else if (normalizedRole === "GUIDE" || normalizedRole === "PROJECT GUIDE") {
      setCurrentPage("guideDashboard");
    } else {
      setCurrentPage("dashboard");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', role: '' });
    setCurrentPage('dashboard');
    localStorage.clear();
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleNotificationOpen = (notification) => {
    const notificationType = (notification?.type || '').toString().trim().toUpperCase();

    if (notificationType === 'CHAT') {
      setCurrentPage('chatPage');
      return;
    }

    if (notificationType === 'MEETING_REQUEST' || notificationType === 'MEETING_APPROVED') {
      setCurrentPage('meetingScheduler');
    }
  };

  // =============================
  // 🔥 AUTHENTICATED AREA
  // =============================
  if (isLoggedIn) {

    // ✅ ADMIN PANEL
    if (currentPage === "admin") {
      return (
        <AdminPanel
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Profile Page
    if (currentPage === "profile") {
      return (
        <ProfilePage
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Project Management
    if (currentPage === "projectManagement") {
      return (
        <ProjectManagement
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Group Formation
    if (currentPage === "groupFormation") {
      return (
        <GroupFormation
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Guide Selection
    if (currentPage === "guideSelection") {
      return (
        <GuideSelection
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Project Idea Submission
    if (currentPage === "projectIdeaSubmission") {
      return (
        <ProjectIdeaSubmission
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // Meeting Scheduler
    if (currentPage === "meetingScheduler") {
      return (
        <MeetingScheduler
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    if (currentPage === "notification") {
      return (
        <NotificationPage
          roleLabel={userData.role || "Student"}
          onBack={() => handleNavigation('dashboard')}
          onNotificationOpen={handleNotificationOpen}
        />
      );
    }

    if (currentPage === "chatPage") {
      return (
        <ChatPage
          onClose={() => handleNavigation('dashboard')}
        />
      );
    }

    if (currentPage === "meetingRoom") {
      return (
        <MeetingRoom
          username={userData.username}
          onBack={() => handleNavigation('meetingScheduler')}
        />
      );
    }

    // Guide dashboard
    if (currentPage === 'guideDashboard') {
      return (
        <GuideDashboard
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // ✅ DEFAULT → STUDENT DASHBOARD
    return (
      <Dashboard
        userRole={userData.role}
        username={userData.username}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

  // =============================
  // 🔓 LOGIN / REGISTER AREA
  // =============================
  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className={`container ${isActive ? 'active' : ''}`}>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <RegisterForm 
          onRegisterSuccess={handleRegisterSuccess} 
          isActive={isActive}
        />
        <TogglePanel 
          onRegisterClick={handleRegisterClick}
          onLoginClick={handleLoginClick}
        />
      </div>
    </>
  );
};

export default App;

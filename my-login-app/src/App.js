

import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TogglePanel from './components/TogglePanel';
import Dashboard from './components/Dashboard';
import GuideDashboard from './components/GuideDashboard';
import ProfilePage from './components/ProfilePage';
import ProjectManagement from './components/ProjectManagement';
import GroupFormation from './components/GroupFormation';
import GuideSelection from './components/GuideSelection';
import ProjectIdeaSubmission from './components/ProjectIdeaSubmission';
import MeetingScheduler from './components/MeetingScheduler';
import AdminPanel from './components/AdminPanel';
import AboutPage from './components/AboutPage';
import './styles/style.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/admin.css';
import './styles/chatpage.css';

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userData, setUserData] = useState({
    username: '',
    role: ''
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterSuccess = () => {
    setIsActive(false);
  };

  const handleLoginSuccess = (username, role) => {
    console.log('LOGIN SUCCESS - Username:', username, 'Role:', role);
    
    setUserData({
      username: username,
      role: role
    });
    setIsLoggedIn(true);
    
    // Navigate based on role
    if (role === 'Admin') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', role: '' });
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  if (isLoggedIn) {
    // ADMIN CHECK - MUST BE FIRST
    if (userData.role === 'Admin') {
      return (
        <AdminPanel
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // GUIDE CHECK - SECOND
    if (userData.role === 'Guide' || userData.role === 'Teacher') {
      return (
        <GuideDashboard
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
        />
      );
    }

    // STUDENT - Other pages
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

    if (currentPage === "about") {
      return (
        <AboutPage
          userRole={userData.role}
          username={userData.username}
          onLogout={handleLogout}
          onNavigate={handleNavigation}
          SidebarComponent={require('./components/Sidebar').default}
          sidebarProps={{
            userRole: userData.role,
            username: userData.username,
            onLogout: handleLogout,
            onNavigate: handleNavigation,
            onSearchToggle: () => {},
            currentPage: 'about'
          }}
        />
      );
    }

    // Default Student Dashboard
    return (
      <Dashboard
        userRole={userData.role}
        username={userData.username}
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

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
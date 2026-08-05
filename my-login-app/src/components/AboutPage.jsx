import React, { useState } from 'react';
import '../styles/aboutPage.css';

const AboutPage = ({ userRole, username, onLogout, onNavigate, SidebarComponent, sidebarProps }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const handleThemeChange = (t) => {
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    setShowThemeDropdown(false);
  };

  const features = [
    { icon: 'bx-briefcase',      title: 'Project Management',  desc: 'End-to-end project lifecycle management with milestone tracking and progress monitoring.' },
    { icon: 'bx-message-dots',   title: 'Chat System',         desc: 'Real-time communication between students and guides with direct messaging support.' },
    { icon: 'bx-calendar-check', title: 'Meeting Scheduling',  desc: 'Schedule and manage meetings with online/offline mode, auto-generated meeting links.' },
    { icon: 'bx-trending-up',    title: 'Progress Tracking',   desc: 'Visual dashboards and milestone charts to monitor team progress in real time.' },
    { icon: 'bx-user-plus',      title: 'Guide Allocation',    desc: 'Smart guide assignment based on expertise and availability with auto-suggestion.' },
    { icon: 'bx-check-square',   title: 'Attendance System',   desc: 'Track presentation and meeting attendance group-wise with toggle controls.' },
  ];

  const roles = [
    {
      icon: 'bx-user-circle',
      role: 'Student',
      color: '#3498db',
      desc: 'Submits project ideas, forms groups, selects guides, tracks milestones, schedules meetings, and monitors progress throughout the project lifecycle.',
    },
    {
      icon: 'bx-user-check',
      role: 'Guide',
      color: '#27ae60',
      desc: 'Reviews idea submissions, allocates tasks, marks attendance, schedules meetings, monitors progress, and provides feedback to assigned student groups.',
    },
    {
      icon: 'bx-shield',
      role: 'Admin',
      color: '#9b59b6',
      desc: 'Manages the entire platform — allocates guides to teams, schedules presentations, monitors all attendance records, and oversees progress across all groups.',
    },
  ];

  const techStack = [
    { icon: 'bx-code-alt',   name: 'React',        desc: 'Frontend UI' },
    { icon: 'bx-server',     name: 'Spring Boot',  desc: 'Backend API' },
    { icon: 'bx-data',       name: 'MySQL',        desc: 'Database' },
    { icon: 'bx-palette',    name: 'HTML / CSS',   desc: 'Styling' },
  ];

  const workflow = [
    { step: '01', icon: 'bx-user',         label: 'Student Registers',   desc: 'Student signs up, forms group, submits project idea' },
    { step: '02', icon: 'bx-bulb',         label: 'Idea Reviewed',       desc: 'Guide / Admin reviews and approves the idea' },
    { step: '03', icon: 'bx-briefcase',    label: 'Project Starts',      desc: 'Guide allocated, milestones set, work begins' },
    { step: '04', icon: 'bx-trending-up',  label: 'Progress Tracked',    desc: 'Meetings held, attendance marked, progress updated' },
    { step: '05', icon: 'bx-award',        label: 'Evaluation',          desc: 'Presentation scheduled, final evaluation completed' },
  ];

  const futureScope = [
    { icon: 'bx-brain',        title: 'AI-Powered Guide Matching',   desc: 'Use machine learning to suggest the most suitable guide based on project domain and past performance.' },
    { icon: 'bx-bell',         title: 'Smart Notifications',          desc: 'Automated reminders for upcoming deadlines, pending reviews, and missed attendance via email/SMS.' },
    { icon: 'bx-bar-chart-alt-2', title: 'Advanced Analytics',        desc: 'Detailed reporting dashboards for admin to analyze project success rates and guide performance over time.' },
  ];

  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <div className="dashboard-wrapper">

        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle"><i className="bx bxs-graduation"></i></div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <i className="bx bx-palette"></i><span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button className={theme === 'light'   ? 'active' : ''} onClick={() => handleThemeChange('light')}><i className="bx bx-sun"></i> Light</button>
                  <button className={theme === 'dark'    ? 'active' : ''} onClick={() => handleThemeChange('dark')}><i className="bx bx-moon"></i> Dark</button>
                  <button className={theme === 'default' ? 'active' : ''} onClick={() => handleThemeChange('default')}><i className="bx bx-brush"></i> Default</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          {/* Sidebar passed as prop */}
          {SidebarComponent && <SidebarComponent {...sidebarProps} currentPage="about" />}

          <main className="dashboard-content">
            <div className="about-page">

              {/* ── Hero ── */}
              <div className="about-hero">
                <div className="about-hero-icon"><i className="bx bxs-graduation"></i></div>
                <h1 className="about-hero-title">MentorMate</h1>
                <p className="about-hero-sub">A Smart Academic Project Management Platform</p>
                <p className="about-hero-desc">
                  MentorMate bridges the gap between students, guides, and administrators — providing a unified
                  platform to manage academic projects from ideation to final evaluation.
                </p>
              </div>

              {/* ── Problem Statement ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(231,76,60,0.12)' }}>
                    <i className="bx bx-error-circle" style={{ color: '#e74c3c' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Problem Statement</h2>
                    <p className="about-section-sub">Challenges in traditional academic project management</p>
                  </div>
                </div>
                <div className="about-problem-grid">
                  {[
                    { icon: 'bx-conversation',   text: 'Poor communication between students and guides' },
                    { icon: 'bx-x-circle',        text: 'No centralized platform for project tracking' },
                    { icon: 'bx-time',            text: 'Manual attendance and progress monitoring is error-prone' },
                    { icon: 'bx-user-x',          text: 'Unstructured guide allocation leads to mismatches' },
                  ].map((p, i) => (
                    <div className="about-problem-item" key={i}>
                      <i className={`bx ${p.icon}`}></i>
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Solution ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(39,174,96,0.12)' }}>
                    <i className="bx bx-check-shield" style={{ color: '#27ae60' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Our Solution</h2>
                    <p className="about-section-sub">How MentorMate solves these challenges</p>
                  </div>
                </div>
                <p className="about-solution-text">
                  MentorMate provides a role-based platform where <strong>Students</strong> manage their projects,
                  <strong> Guides</strong> mentor and review, and <strong>Admins</strong> oversee the entire workflow —
                  all in one place with real-time updates, structured workflows, and smart automation.
                </p>
              </div>

              {/* ── Key Features ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(52,152,219,0.12)' }}>
                    <i className="bx bx-layer" style={{ color: '#3498db' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Key Features</h2>
                    <p className="about-section-sub">Everything you need in one platform</p>
                  </div>
                </div>
                <div className="about-features-grid">
                  {features.map((f, i) => (
                    <div className="about-feature-card" key={i}>
                      <div className="about-feature-icon"><i className={`bx ${f.icon}`}></i></div>
                      <h4 className="about-feature-title">{f.title}</h4>
                      <p className="about-feature-desc">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── User Roles ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(155,89,182,0.12)' }}>
                    <i className="bx bx-group" style={{ color: '#9b59b6' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">User Roles</h2>
                    <p className="about-section-sub">Three distinct roles for complete workflow coverage</p>
                  </div>
                </div>
                <div className="about-roles-grid">
                  {roles.map((r, i) => (
                    <div className="about-role-card" key={i}>
                      <div className="about-role-icon-wrap" style={{ background: `${r.color}18`, border: `2px solid ${r.color}30` }}>
                        <i className={`bx ${r.icon}`} style={{ color: r.color }}></i>
                      </div>
                      <h3 className="about-role-title" style={{ color: r.color }}>{r.role}</h3>
                      <p className="about-role-desc">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Tech Stack ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(44,62,80,0.1)' }}>
                    <i className="bx bx-code-curly" style={{ color: '#2C3E50' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Tech Stack</h2>
                    <p className="about-section-sub">Technologies powering MentorMate</p>
                  </div>
                </div>
                <div className="about-tech-grid">
                  {techStack.map((t, i) => (
                    <div className="about-tech-card" key={i}>
                      <i className={`bx ${t.icon}`}></i>
                      <h4>{t.name}</h4>
                      <span>{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Workflow ── */}
              <div className="about-section-card">
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(243,156,18,0.12)' }}>
                    <i className="bx bx-git-branch" style={{ color: '#f39c12' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Platform Workflow</h2>
                    <p className="about-section-sub">From registration to final evaluation</p>
                  </div>
                </div>
                <div className="about-workflow">
                  {workflow.map((w, i) => (
                    <div className="about-workflow-step" key={i}>
                      <div className="about-wf-circle">
                        <i className={`bx ${w.icon}`}></i>
                      </div>
                      <div className="about-wf-content">
                        <span className="about-wf-num">Step {w.step}</span>
                        <h4 className="about-wf-label">{w.label}</h4>
                        <p className="about-wf-desc">{w.desc}</p>
                      </div>
                      {i < workflow.length - 1 && <div className="about-wf-line"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Future Scope ── */}
              <div className="about-section-card" style={{ marginBottom: '2rem' }}>
                <div className="about-section-head">
                  <div className="about-section-icon-wrap" style={{ background: 'rgba(52,152,219,0.12)' }}>
                    <i className="bx bx-rocket" style={{ color: '#3498db' }}></i>
                  </div>
                  <div>
                    <h2 className="about-section-title">Future Scope</h2>
                    <p className="about-section-sub">What's coming next for MentorMate</p>
                  </div>
                </div>
                <div className="about-future-grid">
                  {futureScope.map((f, i) => (
                    <div className="about-future-card" key={i}>
                      <i className={`bx ${f.icon}`}></i>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
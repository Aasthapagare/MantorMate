import React, { useState } from 'react';

const GuideSelection = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('projectManagement');
    }
  };

  // Dummy list of available guides
  const availableGuides = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      department: 'Computer Science',
      expertise: 'AI & Machine Learning',
      availability: 'Available',
      projects: 2
    },
    {
      id: 2,
      name: 'Prof. Anjali Sharma',
      department: 'Electronics',
      expertise: 'IoT & Embedded Systems',
      availability: 'Available',
      projects: 1
    },
    {
      id: 3,
      name: 'Dr. Vikram Singh',
      department: 'Mechanical Engineering',
      expertise: 'Robotics & Automation',
      availability: 'Limited',
      projects: 3
    },
    {
      id: 4,
      name: 'Prof. Priya Mehta',
      department: 'Computer Science',
      expertise: 'Web Development & Cloud',
      availability: 'Available',
      projects: 1
    },
    {
      id: 5,
      name: 'Dr. Amit Patel',
      department: 'Information Technology',
      expertise: 'Cybersecurity & Networks',
      availability: 'Busy',
      projects: 4
    }
  ];

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
    console.log('Guide selected:', guide);
    // TODO: Implement guide selection logic
  };

  const getAvailabilityColor = (status) => {
    switch(status) {
      case 'Available': return '#1abc9c';
      case 'Limited': return '#f39c12';
      case 'Busy': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="dashboard-wrapper">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="back-button" onClick={handleBack}>
              <i className='bx bx-arrow-back'></i>
              <span>Back</span>
            </button>
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

        <div className="sub-page-container">
          <main className="sub-page-content">
            <div className="page-header">
              <h2 className="page-title">
                <i className='bx bx-user-check'></i>
                Guide Selection
              </h2>
              <p className="page-subtitle">Select a guide for your project</p>
            </div>

            <div className="guides-container">
              <h3 className="section-title">Available Guides</h3>
              <div className="guides-list">
                {availableGuides.map(guide => (
                  <div key={guide.id} className="guide-card">
                    <div className="guide-header">
                      <div className="guide-avatar">
                        <i className='bx bx-user-circle'></i>
                      </div>
                      <div className="guide-info">
                        <h4 className="guide-name">{guide.name}</h4>
                        <p className="guide-department">{guide.department}</p>
                      </div>
                      <div 
                        className="availability-badge"
                        style={{ backgroundColor: getAvailabilityColor(guide.availability) }}
                      >
                        {guide.availability}
                      </div>
                    </div>

                    <div className="guide-details">
                      <div className="detail-item">
                        <i className='bx bx-book'></i>
                        <span><strong>Expertise:</strong> {guide.expertise}</span>
                      </div>
                      <div className="detail-item">
                        <i className='bx bx-briefcase'></i>
                        <span><strong>Current Projects:</strong> {guide.projects}</span>
                      </div>
                    </div>

                    <button 
                      className="select-guide-btn"
                      onClick={() => handleSelectGuide(guide)}
                      disabled={guide.availability === 'Busy'}
                    >
                      <i className='bx bx-check-circle'></i>
                      {guide.availability === 'Busy' ? 'Not Available' : 'Request as Guide'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .sub-page-container {
          width: 100%;
          min-height: calc(100vh - 80px);
          background: var(--bg-primary);
        }

        .sub-page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 1.5rem;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-3px);
        }

        .back-button i {
          font-size: 1.25rem;
        }

        .page-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .page-title i {
          font-size: 2.5rem;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        .guides-container {
          margin-top: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--accent-color);
        }

        .guides-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .guide-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-color);
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .guide-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .guide-avatar i {
          font-size: 2.5rem;
          color: white;
        }

        .guide-info {
          flex: 1;
        }

        .guide-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .guide-department {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .availability-badge {
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .guide-details {
          margin-bottom: 1.25rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          color: var(--text-primary);
        }

        .detail-item i {
          font-size: 1.25rem;
          color: var(--accent-color);
        }

        .detail-item span {
          font-size: 0.95rem;
        }

        .select-guide-btn {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .select-guide-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .select-guide-btn:disabled {
          background: #95a5a6;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .select-guide-btn i {
          font-size: 1.25rem;
        }

        @media (max-width: 768px) {
          .sub-page-content {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .guides-list {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .back-button {
            margin-right: 1rem;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .back-button span {
            display: none;
          }

          .guide-header {
            flex-wrap: wrap;
          }

          .availability-badge {
            width: 100%;
            text-align: center;
            margin-top: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.75rem;
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default GuideSelection;
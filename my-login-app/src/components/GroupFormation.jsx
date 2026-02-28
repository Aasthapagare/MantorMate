import React, { useState } from 'react';

const GroupFormation = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

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

  const groupOptions = [
    {
      id: 1,
      title: 'Create Group',
      icon: 'bx-group',
      description: 'Create a new project group',
      color: '#3498db'
    },
    {
      id: 2,
      title: 'Add Members',
      icon: 'bx-user-plus',
      description: 'Add members by Student ID',
      color: '#9b59b6'
    },
    {
      id: 3,
      title: 'View Group',
      icon: 'bx-show',
      description: 'View your current group details',
      color: '#1abc9c'
    }
  ];

  const handleOptionClick = (optionId) => {
    console.log('Group Formation option clicked:', optionId);
    // TODO: Implement specific functionality for each option
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
                <i className='bx bx-group'></i>
                Group Formation
              </h2>
              <p className="page-subtitle">Create and manage your project group</p>
            </div>

            <div className="options-grid">
              {groupOptions.map(option => (
                <div 
                  key={option.id}
                  className="option-card"
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div className="option-icon" style={{ backgroundColor: option.color }}>
                    <i className={`bx ${option.icon}`}></i>
                  </div>
                  <h3 className="option-title">{option.title}</h3>
                  <p className="option-description">{option.description}</p>
                  <div className="option-arrow">
                    <i className='bx bx-right-arrow-alt'></i>
                  </div>
                </div>
              ))}
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

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .option-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: var(--shadow);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .option-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-color);
        }

        .option-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-color), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .option-card:hover::before {
          opacity: 1;
        }

        .option-icon {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease;
        }

        .option-card:hover .option-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .option-icon i {
          font-size: 2rem;
          color: white;
        }

        .option-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .option-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .option-arrow {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .option-card:hover .option-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .option-arrow i {
          font-size: 1.5rem;
          color: white;
        }

        @media (max-width: 768px) {
          .sub-page-content {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .page-title i {
            font-size: 2rem;
          }

          .options-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .back-button {
            margin-right: 1rem;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .back-button span {
            display: none;
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

export default GroupFormation;
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import FooterIcons from './FooterIcons';

// const ProjectManagement = ({ userRole, username, onLogout, onNavigate }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
//   const [showThemeDropdown, setShowThemeDropdown] = useState(false);

//   const handleThemeChange = (newTheme) => {
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     setShowThemeDropdown(false);
//   };

//   const handleFooterSearch = () => {
//     if (onNavigate) {
//       onNavigate('dashboard');
//     }
//     localStorage.setItem('openSearch', 'true');
//   };

//   const handleFooterChat = () => {
//     if (onNavigate) {
//       onNavigate('dashboard');
//     }
//     localStorage.setItem('openChat', 'true');
//   };

//   const projectOptions = [
//     {
//       id: 1,
//       title: 'Group Formation',
//       icon: 'bx-group',
//       description: 'Create and manage project groups',
//       color: '#3498db'
//     },
//     {
//       id: 2,
//       title: 'Guide Selection',
//       icon: 'bx-user-check',
//       description: 'Select your project guide',
//       color: '#9b59b6'
//     },
//     {
//       id: 3,
//       title: 'Project Idea Submission',
//       icon: 'bx-bulb',
//       description: 'Submit your project proposal',
//       color: '#e74c3c'
//     },
//     {
//       id: 4,
//       title: 'Document Upload',
//       icon: 'bx-upload',
//       description: 'Upload project documents',
//       color: '#f39c12'
//     },
//     {
//       id: 5,
//       title: 'Project Details',
//       icon: 'bx-detail',
//       description: 'View and edit project information',
//       color: '#1abc9c'
//     },
//     {
//       id: 6,
//       title: 'Project Status Tracking',
//       icon: 'bx-line-chart',
//       description: 'Track your project progress',
//       color: '#34495e'
//     }
//   ];

//   const handleOptionClick = (optionId) => {
//     console.log('Option clicked:', optionId);
//     // TODO: Navigate to specific project management section
//   };

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
//       <div className="dashboard-wrapper">
//         {/* Header - Same as Dashboard */}
//         <header className="dashboard-header">
//           <div className="header-left">
//             <div className="logo-container">
//               <div className="logo-circle">
//                 <i className='bx bxs-graduation'></i>
//               </div>
//               <h1 className="project-name">MentorMate</h1>
//             </div>
//           </div>
//           <div className="header-right">
//             <div className="theme-selector">
//               <button 
//                 className="theme-btn"
//                 onClick={() => setShowThemeDropdown(!showThemeDropdown)}
//               >
//                 <i className='bx bx-palette'></i>
//                 <span>Theme</span>
//               </button>
//               {showThemeDropdown && (
//                 <div className="theme-dropdown">
//                   <button 
//                     className={theme === 'light' ? 'active' : ''}
//                     onClick={() => handleThemeChange('light')}
//                   >
//                     <i className='bx bx-sun'></i> Light
//                   </button>
//                   <button 
//                     className={theme === 'dark' ? 'active' : ''}
//                     onClick={() => handleThemeChange('dark')}
//                   >
//                     <i className='bx bx-moon'></i> Dark
//                   </button>
//                   <button 
//                     className={theme === 'default' ? 'active' : ''}
//                     onClick={() => handleThemeChange('default')}
//                   >
//                     <i className='bx bx-brush'></i> Default
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <div className="dashboard-container">
//           <Sidebar 
//             userRole={userRole} 
//             username={username}
//             onLogout={onLogout}
//             onNavigate={onNavigate}
//             onSearchToggle={() => {}}
//             currentPage="projectManagement"
//             isSearchOpen={false}
//           />

//           <main className="dashboard-content">
//             <div className="project-management-page">
//               {/* Page Title */}
//               <div className="page-header">
//                 <h2 className="page-title">
//                   <i className='bx bx-briefcase'></i>
//                   Project Management
//                 </h2>
//                 <p className="page-subtitle">Manage your academic projects efficiently</p>
//               </div>

//               {/* Project Options Grid */}
//               <div className="project-options-grid">
//                 {projectOptions.map(option => (
//                   <div 
//                     key={option.id}
//                     className="project-option-card"
//                     onClick={() => handleOptionClick(option.id)}
//                   >
//                     <div className="option-icon" style={{ backgroundColor: option.color }}>
//                       <i className={`bx ${option.icon}`}></i>
//                     </div>
//                     <h3 className="option-title">{option.title}</h3>
//                     <p className="option-description">{option.description}</p>
//                     <div className="option-arrow">
//                       <i className='bx bx-right-arrow-alt'></i>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer Icons */}
//             <FooterIcons 
//               onOpenChat={handleFooterChat}
//               onOpenSearch={handleFooterSearch}
//               onNavigate={onNavigate}
//             />
//           </main>
//         </div>
//       </div>

//       {/* Add custom styles for Project Management page */}
//       <style jsx>{`
//         .project-management-page {
//           padding: 2rem;
//           min-height: calc(100vh - 200px);
//         }

//         .page-header {
//           margin-bottom: 3rem;
//           text-align: center;
//         }

//         .page-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: var(--text-primary);
//           margin-bottom: 0.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 1rem;
//         }

//         .page-title i {
//           font-size: 2.5rem;
//         }

//         .page-subtitle {
//           font-size: 1.1rem;
//           color: var(--text-secondary);
//           opacity: 0.8;
//         }

//         .project-options-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 2rem;
//           max-width: 1400px;
//           margin: 0 auto;
//         }

//         .project-option-card {
//           background: var(--card-bg);
//           border-radius: 16px;
//           padding: 2rem;
//           box-shadow: var(--shadow);
//           cursor: pointer;
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//           border: 2px solid transparent;
//         }

//         .project-option-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
//           border-color: var(--accent-color);
//         }

//         .project-option-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 4px;
//           background: linear-gradient(90deg, var(--accent-color), transparent);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .project-option-card:hover::before {
//           opacity: 1;
//         }

//         .option-icon {
//           width: 70px;
//           height: 70px;
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 1.5rem;
//           transition: transform 0.3s ease;
//         }

//         .project-option-card:hover .option-icon {
//           transform: scale(1.1) rotate(5deg);
//         }

//         .option-icon i {
//           font-size: 2rem;
//           color: white;
//         }

//         .option-title {
//           font-size: 1.4rem;
//           font-weight: 600;
//           color: var(--text-primary);
//           margin-bottom: 0.75rem;
//         }

//         .option-description {
//           font-size: 1rem;
//           color: var(--text-secondary);
//           line-height: 1.6;
//           margin-bottom: 1rem;
//         }

//         .option-arrow {
//           position: absolute;
//           bottom: 1.5rem;
//           right: 1.5rem;
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: var(--accent-color);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           opacity: 0;
//           transform: translateX(-10px);
//           transition: all 0.3s ease;
//         }

//         .project-option-card:hover .option-arrow {
//           opacity: 1;
//           transform: translateX(0);
//         }

//         .option-arrow i {
//           font-size: 1.5rem;
//           color: white;
//         }

//         /* Responsive Design */
//         @media (max-width: 1200px) {
//           .project-options-grid {
//             grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           }
//         }

//         @media (max-width: 768px) {
//           .project-management-page {
//             padding: 1.5rem;
//           }

//           .page-title {
//             font-size: 2rem;
//           }

//           .page-title i {
//             font-size: 2rem;
//           }

//           .page-subtitle {
//             font-size: 1rem;
//           }

//           .project-options-grid {
//             grid-template-columns: 1fr;
//             gap: 1.5rem;
//           }

//           .project-option-card {
//             padding: 1.5rem;
//           }

//           .option-icon {
//             width: 60px;
//             height: 60px;
//           }

//           .option-icon i {
//             font-size: 1.75rem;
//           }

//           .option-title {
//             font-size: 1.2rem;
//           }

//           .option-description {
//             font-size: 0.9rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .project-management-page {
//             padding: 1rem;
//           }

//           .page-title {
//             font-size: 1.75rem;
//             flex-direction: column;
//             gap: 0.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ProjectManagement;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FooterIcons from './FooterIcons';

const ProjectManagement = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleFooterSearch = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
    localStorage.setItem('openSearch', 'true');
  };

  const handleFooterChat = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
    localStorage.setItem('openChat', 'true');
  };

  const projectOptions = [
    {
      id: 1,
      title: 'Group Formation',
      icon: 'bx-group',
      description: 'Create and manage project groups',
      color: '#3498db',
      route: 'groupFormation'
    },
    {
      id: 2,
      title: 'Guide Selection',
      icon: 'bx-user-check',
      description: 'Select your project guide',
      color: '#9b59b6',
      route: 'guideSelection'
    },
    {
      id: 3,
      title: 'Project Idea Submission',
      icon: 'bx-bulb',
      description: 'Submit your project proposal',
      color: '#e74c3c',
      route: 'projectIdeaSubmission'
    },
    {
      id: 4,
      title: 'Document Upload',
      icon: 'bx-upload',
      description: 'Upload project documents',
      color: '#f39c12'
    },
    {
      id: 5,
      title: 'Project Details',
      icon: 'bx-detail',
      description: 'View and edit project information',
      color: '#1abc9c'
    },
    {
      id: 6,
      title: 'Project Status Tracking',
      icon: 'bx-line-chart',
      description: 'Track your project progress',
      color: '#34495e'
    }
  ];

  const handleOptionClick = (option) => {
    if (option.route && onNavigate) {
      onNavigate(option.route);
    } else {
      console.log('Option clicked:', option.id);
      // TODO: Implement other options (Document Upload, Project Details, Status Tracking)
    }
  };

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="dashboard-wrapper">
        {/* Header - Same as Dashboard */}
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
            onSearchToggle={() => {}}
            currentPage="projectManagement"
            isSearchOpen={false}
          />

          <main className="dashboard-content">
            <div className="project-management-page">
              {/* Page Title */}
              <div className="page-header">
                <h2 className="page-title">
                  <i className='bx bx-briefcase'></i>
                  Project Management
                </h2>
                <p className="page-subtitle">Manage your academic projects efficiently</p>
              </div>

              {/* Project Options Grid */}
              <div className="project-options-grid">
                {projectOptions.map(option => (
                  <div 
                    key={option.id}
                    className="project-option-card"
                    onClick={() => handleOptionClick(option)}
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
            </div>

            {/* Footer Icons */}
            <FooterIcons 
              onOpenChat={handleFooterChat}
              onOpenSearch={handleFooterSearch}
              onNavigate={onNavigate}
            />
          </main>
        </div>
      </div>

      {/* Add custom styles for Project Management page */}
      <style jsx>{`
        .project-management-page {
          padding: 2rem;
          min-height: calc(100vh - 200px);
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

        .project-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .project-option-card {
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

        .project-option-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: var(--accent-color);
        }

        .project-option-card::before {
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

        .project-option-card:hover::before {
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

        .project-option-card:hover .option-icon {
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

        .project-option-card:hover .option-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .option-arrow i {
          font-size: 1.5rem;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .project-options-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .project-management-page {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .page-title i {
            font-size: 2rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .project-options-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .project-option-card {
            padding: 1.5rem;
          }

          .option-icon {
            width: 60px;
            height: 60px;
          }

          .option-icon i {
            font-size: 1.75rem;
          }

          .option-title {
            font-size: 1.2rem;
          }

          .option-description {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .project-management-page {
            padding: 1rem;
          }

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

export default ProjectManagement;
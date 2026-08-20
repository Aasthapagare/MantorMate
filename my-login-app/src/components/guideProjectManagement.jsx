
// import React, { useState } from 'react';
// import AssignedGroups from './AssignedGroups';
// import GroupDetails from './GroupDetails';
// import IdeaReview from './IdeaReview';
// import '../styles/projectManagement.css';

// const ProjectManagement = ({ onBack }) => {
//   const [currentView, setCurrentView] = useState('main');
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const sections = [
//     {
//       id: 'assigned-groups',
//       title: 'Assigned Groups',
//       icon: 'bx-group',
//       description: 'View and manage your assigned student groups',
//       color: '#2C3E50'
//     },
//     {
//       id: 'idea-review',
//       title: 'Idea Review',
//       icon: 'bx-bulb',
//       description: 'Review and approve project ideas submitted by students',
//       color: '#34495E'
//     },
//     {
//       id: 'group-details',
//       title: 'Group Details',
//       icon: 'bx-detail',
//       description: 'Access detailed information about each group',
//       color: '#2C3E50'
//     },
//     {
//       id: 'progress-tracking',
//       title: 'Progress Tracking',
//       icon: 'bx-trending-up',
//       description: 'Monitor and track project progress for all groups',
//       color: '#34495E'
//     }
//   ];

//   const handleSectionClick = (sectionId) => {
//     if (sectionId === 'assigned-groups') {
//       setCurrentView('assigned-groups');
//     } else if (sectionId === 'idea-review') {
//       setCurrentView('idea-review');
//     }
//   };

//   const handleViewDetails = (group) => {
//     setSelectedGroup(group);
//     setCurrentView('group-details');
//   };

//   const handleBackToMain = () => {
//     setCurrentView('main');
//     setSelectedGroup(null);
//   };

//   const handleBackToGroups = () => {
//     setCurrentView('assigned-groups');
//     setSelectedGroup(null);
//   };

//   // Idea Review View
//   if (currentView === 'idea-review') {
//     return (
//       <div className="project-management-wrapper">
//         <div className="pm-header">
//           <button className="back-btn" onClick={handleBackToMain}>
//             <i className='bx bx-arrow-back'></i>
//             Back to Project Management
//           </button>
//         </div>
//         <IdeaReview onBack={handleBackToMain} />
//       </div>
//     );
//   }

//   // Assigned Groups View
//   if (currentView === 'assigned-groups') {
//     return (
//       <div className="project-management-wrapper">
//         <div className="pm-header">
//           <button className="back-btn" onClick={handleBackToMain}>
//             <i className='bx bx-arrow-back'></i>
//             Back to Project Management
//           </button>
//         </div>
//         <AssignedGroups onViewDetails={handleViewDetails} />
//       </div>
//     );
//   }

//   // Group Details View
//   if (currentView === 'group-details' && selectedGroup) {
//     return (
//       <div className="project-management-wrapper">
//         <div className="pm-header">
//           <button className="back-btn" onClick={handleBackToGroups}>
//             <i className='bx bx-arrow-back'></i>
//             Back to Assigned Groups
//           </button>
//         </div>
//         <GroupDetails group={selectedGroup} />
//       </div>
//     );
//   }

//   // Main View
//   return (
//     <div className="project-management-wrapper">
//       <div className="pm-header">
//         <button className="back-btn" onClick={onBack}>
//           <i className='bx bx-arrow-back'></i>
//           Back to Dashboard
//         </button>
//         <h1>Project Management</h1>
//         <p>Manage student groups and track project progress</p>
//       </div>

//       <div className="pm-grid">
//         {sections.map((section) => (
//           <div
//             key={section.id}
//             className="pm-card"
//             onClick={() => handleSectionClick(section.id)}
//           >
//             <div className="pm-icon" style={{ background: section.color }}>
//               <i className={`bx ${section.icon}`}></i>
//             </div>
//             <div className="pm-content">
//               <h3>{section.title}</h3>
//               <p>{section.description}</p>
//             </div>
//             <div className="pm-arrow">
//               <i className='bx bx-chevron-right'></i>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pm-stats">
//         <div className="stat-card">
//           <div className="stat-icon">
//             <i className='bx bx-group'></i>
//           </div>
//           <div className="stat-info">
//             <h4>Total Groups</h4>
//             <p className="stat-number">12</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <i className='bx bx-time-five'></i>
//           </div>
//           <div className="stat-info">
//             <h4>Pending Reviews</h4>
//             <p className="stat-number">4</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <i className='bx bx-check-circle'></i>
//           </div>
//           <div className="stat-info">
//             <h4>Active Projects</h4>
//             <p className="stat-number">8</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">
//             <i className='bx bx-trending-up'></i>
//           </div>
//           <div className="stat-info">
//             <h4>Avg Progress</h4>
//             <p className="stat-number">67%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectManagement;
import React, { useEffect, useState } from 'react';
import AssignedGroups from './AssignedGroups';
import GroupDetails from './GroupDetails';
import IdeaReview from './IdeaReview';
import ProgressTracking from './ProgressTracking';
import '../styles/projectManagement.css';
import { getGuideGroups } from '../services/guideAttendanceService';

const ProjectManagement = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [stats, setStats] = useState({ totalProjects: 0, pendingReviews: 0 });

  const sections = [
    {
      id: 'assigned-groups',
      title: 'Assigned Groups',
      icon: 'bx-group',
      description: 'View and manage your assigned student groups',
      color: '#2C3E50'
    },
    {
      id: 'idea-review',
      title: 'Idea Review',
      icon: 'bx-bulb',
      description: 'Review and approve project ideas submitted by students',
      color: '#34495E'
    },
    {
      id: 'progress-tracking',
      title: 'Progress Tracking',
      icon: 'bx-trending-up',
      description: 'Monitor and track project progress for all groups',
      color: '#34495E'
    }
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const groups = await getGuideGroups();
        const totalProjects = (groups || []).length;
        const pendingReviews = (groups || []).filter(
          (group) => (group.ideaStatus || '').toUpperCase() === 'PENDING'
        ).length;

        setStats({ totalProjects, pendingReviews });
      } catch (error) {
        setStats({ totalProjects: 0, pendingReviews: 0 });
      }
    };

    loadStats();
  }, [currentView]);

  const handleSectionClick = (sectionId) => {
    if (sectionId === 'assigned-groups') {
      setCurrentView('assigned-groups');
    } else if (sectionId === 'idea-review') {
      setCurrentView('idea-review');
    } else if (sectionId === 'progress-tracking') {
      setCurrentView('progress-tracking');
    }
  };

  const handleViewDetails = (group) => {
    setSelectedGroup(group);
    setCurrentView('group-details');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedGroup(null);
  };

  const handleBackToGroups = () => {
    setCurrentView('assigned-groups');
    setSelectedGroup(null);
  };

  // Progress Tracking View
  if (currentView === 'progress-tracking') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}>
            <i className='bx bx-arrow-back'></i>
            Back to Project Management
          </button>
        </div>
        <ProgressTracking onBack={handleBackToMain} />
      </div>
    );
  }

  // Idea Review View
  if (currentView === 'idea-review') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}>
            <i className='bx bx-arrow-back'></i>
            Back to Project Management
          </button>
        </div>
        <IdeaReview onBack={handleBackToMain} />
      </div>
    );
  }

  // Assigned Groups View
  if (currentView === 'assigned-groups') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}>
            <i className='bx bx-arrow-back'></i>
            Back to Project Management
          </button>
        </div>
        <AssignedGroups onViewDetails={handleViewDetails} />
      </div>
    );
  }

  // Group Details View
  if (currentView === 'group-details' && selectedGroup) {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToGroups}>
            <i className='bx bx-arrow-back'></i>
            Back to Assigned Groups
          </button>
        </div>
        <GroupDetails group={selectedGroup} />
      </div>
    );
  }

  // Main View
  return (
    <div className="project-management-wrapper">
      <div className="pm-header">
        <button className="back-btn" onClick={onBack}>
          <i className='bx bx-arrow-back'></i>
          Back to Dashboard
        </button>
        <h1>Project Management</h1>
        <p>Manage student groups and track project progress</p>
      </div>

      <div className="pm-grid">
        {sections.map((section) => (
          <div
            key={section.id}
            className="pm-card"
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="pm-icon" style={{ background: section.color }}>
              <i className={`bx ${section.icon}`}></i>
            </div>
            <div className="pm-content">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="pm-arrow">
              <i className='bx bx-chevron-right'></i>
            </div>
          </div>
        ))}
      </div>

      <div className="pm-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <i className='bx bx-group'></i>
          </div>
          <div className="stat-info">
            <h4>Total Projects</h4>
            <p className="stat-number">{stats.totalProjects}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className='bx bx-time-five'></i>
          </div>
          <div className="stat-info">
            <h4>Pending Reviews</h4>
            <p className="stat-number">{stats.pendingReviews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;

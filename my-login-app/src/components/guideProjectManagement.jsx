
// import React, { useState } from 'react';
// import AssignedGroups from './AssignedGroups';
// import GroupDetails from './GroupDetails';
// import IdeaReview from './IdeaReview';
// import ProgressTracking from './ProgressTracking';
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
//     } else if (sectionId === 'progress-tracking') {
//       setCurrentView('progress-tracking');
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

//   // Progress Tracking View
//   if (currentView === 'progress-tracking') {
//     return (
//       <div className="project-management-wrapper">
//         <div className="pm-header">
//           <button className="back-btn" onClick={handleBackToMain}>
//             <i className='bx bx-arrow-back'></i>
//             Back to Project Management
//           </button>
//         </div>
//         <ProgressTracking onBack={handleBackToMain} />
//       </div>
//     );
//   }

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
//             <p className="stat-number">53%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectManagement;

import React, { useState } from 'react';
import AssignedGroups from './AssignedGroups';
import GroupDetails from './GroupDetails';
import IdeaReview from './IdeaReview';
import ProgressTracking from './ProgressTracking';
import '../styles/projectManagement.css';

/* ── All groups data (shared) ─────────────── */
const ALL_GROUPS = [
  { id: 1, groupName: 'Team Alpha',   projectTitle: 'AI Chatbot System',      ideaStatus: 'Approved'      },
  { id: 2, groupName: 'Team Beta',    projectTitle: 'E-Commerce Platform',    ideaStatus: 'Pending'       },
  { id: 3, groupName: 'Team Gamma',   projectTitle: 'IoT Smart Home',         ideaStatus: 'Approved'      },
  { id: 4, groupName: 'Team Delta',   projectTitle: 'Blockchain Voting',      ideaStatus: 'Under Review'  },
  { id: 5, groupName: 'Team Epsilon', projectTitle: 'Mobile Health App',      ideaStatus: 'Approved'      },
  { id: 6, groupName: 'Team Zeta',    projectTitle: 'Cloud Storage Solution', ideaStatus: 'Pending'       },
];

/* ── Group Select Sub-component (hooks OUTSIDE if) ── */
const GroupSelectView = ({ onBack, onViewDetails }) => {
  const [pickId, setPickId] = useState('');
  const pickedGroup = ALL_GROUPS.find(g => g.id === Number(pickId));

  return (
    <div className="project-management-wrapper">
      <div className="pm-header">
        <button className="back-btn" onClick={onBack}>
          <i className="bx bx-arrow-back"></i>
          Back to Project Management
        </button>
      </div>
      <div className="gd-select-container">
        <div className="gd-select-card">
          <div className="gd-select-head">
            <div className="gd-select-icon"><i className="bx bx-detail"></i></div>
            <div>
              <h2 className="gd-select-title">Group Details</h2>
              <p className="gd-select-sub">Select a group to view its complete details</p>
            </div>
          </div>
          <div className="gd-select-row">
            <label className="gd-select-label">Select Group</label>
            <select
              className="gd-select-dropdown"
              value={pickId}
              onChange={e => setPickId(e.target.value)}
            >
              <option value="">-- Choose a Group --</option>
              {ALL_GROUPS.map(g => (
                <option key={g.id} value={g.id}>{g.groupName} — {g.projectTitle}</option>
              ))}
            </select>
            <button
              className="gd-view-btn"
              onClick={() => pickedGroup && onViewDetails(pickedGroup)}
              disabled={!pickedGroup}
            >
              <i className="bx bx-right-arrow-alt"></i>
              View Details
            </button>
          </div>
          {pickedGroup && (
            <div className="gd-preview-card">
              <div className="gd-preview-row">
                <span className="gd-preview-label">Group Name:</span>
                <strong className="gd-preview-val">{pickedGroup.groupName}</strong>
              </div>
              <div className="gd-preview-row">
                <span className="gd-preview-label">Project:</span>
                <span className="gd-preview-val">{pickedGroup.projectTitle}</span>
              </div>
              <div className="gd-preview-row">
                <span className="gd-preview-label">Status:</span>
                <span className={`gd-status-badge gd-status-${pickedGroup.ideaStatus.toLowerCase().replace(' ', '-')}`}>
                  {pickedGroup.ideaStatus}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Main ProjectManagement Component ──────── */
const ProjectManagement = ({ onBack }) => {
  const [currentView, setCurrentView]   = useState('main');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const sections = [
    { id: 'assigned-groups',  title: 'Assigned Groups',   icon: 'bx-group',       description: 'View and manage your assigned student groups',            color: '#2C3E50' },
    { id: 'idea-review',      title: 'Idea Review',        icon: 'bx-bulb',        description: 'Review and approve project ideas submitted by students',  color: '#34495E' },
    { id: 'group-details',    title: 'Group Details',      icon: 'bx-detail',      description: 'Access detailed information about each group',            color: '#2C3E50' },
    { id: 'progress-tracking',title: 'Progress Tracking',  icon: 'bx-trending-up', description: 'Monitor and track project progress for all groups',        color: '#34495E' },
  ];

  const handleSectionClick = (sectionId) => {
    if      (sectionId === 'assigned-groups')   setCurrentView('assigned-groups');
    else if (sectionId === 'idea-review')       setCurrentView('idea-review');
    else if (sectionId === 'progress-tracking') setCurrentView('progress-tracking');
    else if (sectionId === 'group-details')     setCurrentView('group-select');
  };

  const handleViewDetails = (group) => {
    setSelectedGroup(group);
    setCurrentView('group-details');
  };

  const handleBackToMain = () => { setCurrentView('main'); setSelectedGroup(null); };

  /* ── Views ── */
  if (currentView === 'progress-tracking') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}><i className="bx bx-arrow-back"></i> Back to Project Management</button>
        </div>
        <ProgressTracking onBack={handleBackToMain} />
      </div>
    );
  }

  if (currentView === 'idea-review') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}><i className="bx bx-arrow-back"></i> Back to Project Management</button>
        </div>
        <IdeaReview onBack={handleBackToMain} />
      </div>
    );
  }

  if (currentView === 'assigned-groups') {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={handleBackToMain}><i className="bx bx-arrow-back"></i> Back to Project Management</button>
        </div>
        <AssignedGroups onViewDetails={handleViewDetails} />
      </div>
    );
  }

  if (currentView === 'group-select') {
    return (
      <GroupSelectView
        onBack={handleBackToMain}
        onViewDetails={handleViewDetails}
      />
    );
  }

  if (currentView === 'group-details' && selectedGroup) {
    return (
      <div className="project-management-wrapper">
        <div className="pm-header">
          <button className="back-btn" onClick={() => setCurrentView('group-select')}>
            <i className="bx bx-arrow-back"></i> Back to Group Select
          </button>
        </div>
        <GroupDetails group={selectedGroup} />
      </div>
    );
  }

  /* ── Main View ── */
  return (
    <div className="project-management-wrapper">
      <div className="pm-header">
        <button className="back-btn" onClick={onBack}><i className="bx bx-arrow-back"></i> Back to Dashboard</button>
        <h1>Project Management</h1>
        <p>Manage student groups and track project progress</p>
      </div>

      <div className="pm-grid">
        {sections.map((section) => (
          <div key={section.id} className="pm-card" onClick={() => handleSectionClick(section.id)}>
            <div className="pm-icon" style={{ background: section.color }}>
              <i className={`bx ${section.icon}`}></i>
            </div>
            <div className="pm-content">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="pm-arrow"><i className="bx bx-chevron-right"></i></div>
          </div>
        ))}
      </div>

      <div className="pm-stats">
        <div className="stat-card">
          <div className="stat-icon"><i className="bx bx-group"></i></div>
          <div className="stat-info"><h4>Total Groups</h4><p className="stat-number">12</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="bx bx-time-five"></i></div>
          <div className="stat-info"><h4>Pending Reviews</h4><p className="stat-number">4</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="bx bx-check-circle"></i></div>
          <div className="stat-info"><h4>Active Projects</h4><p className="stat-number">8</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="bx bx-trending-up"></i></div>
          <div className="stat-info"><h4>Avg Progress</h4><p className="stat-number">53%</p></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
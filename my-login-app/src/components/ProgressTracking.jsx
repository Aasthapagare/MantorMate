// import React, { useState, useEffect } from 'react';
// import '../styles/progressTracking.css';

// const ProgressTracking = ({ onBack }) => {
//   const [loading, setLoading] = useState(true);
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => {
//       setGroups([
//         {
//           id: 1,
//           groupName: 'Alpha Team',
//           projectTitle: 'AI Chatbot System',
//           presentationsAttended: 4,
//           totalPresentations: 5,
//           milestonesCompleted: 85,
//           meetingCount: 6,
//           status: 'Ahead'
//         },
//         {
//           id: 2,
//           groupName: 'Beta Team',
//           projectTitle: 'E-Commerce Platform',
//           presentationsAttended: 3,
//           totalPresentations: 5,
//           milestonesCompleted: 60,
//           meetingCount: 4,
//           status: 'On Track'
//         },
//         {
//           id: 3,
//           groupName: 'Gamma Team',
//           projectTitle: 'IoT Smart Home',
//           presentationsAttended: 4,
//           totalPresentations: 5,
//           milestonesCompleted: 75,
//           meetingCount: 5,
//           status: 'On Track'
//         },
//         {
//           id: 4,
//           groupName: 'Delta Team',
//           projectTitle: 'Blockchain Voting',
//           presentationsAttended: 2,
//           totalPresentations: 5,
//           milestonesCompleted: 35,
//           meetingCount: 3,
//           status: 'Delayed'
//         },
//         {
//           id: 5,
//           groupName: 'Epsilon Team',
//           projectTitle: 'Mobile Health App',
//           presentationsAttended: 3,
//           totalPresentations: 5,
//           milestonesCompleted: 55,
//           meetingCount: 4,
//           status: 'On Track'
//         },
//         {
//           id: 6,
//           groupName: 'Zeta Team',
//           projectTitle: 'Cloud Storage Solution',
//           presentationsAttended: 1,
//           totalPresentations: 5,
//           milestonesCompleted: 25,
//           meetingCount: 2,
//           status: 'Delayed'
//         }
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const getProgressColor = (progress) => {
//     if (progress >= 71) return '#28a745';
//     if (progress >= 41) return '#ffc107';
//     return '#dc3545';
//   };

//   const getStatusClass = (status) => {
//     if (status === 'Ahead') return 'status-ahead';
//     if (status === 'Delayed') return 'status-delayed';
//     return 'status-ontrack';
//   };

//   if (loading) {
//     return (
//       <div className="progress-tracking-container">
//         <div className="progress-header">
//           <h2>Progress Tracking</h2>
//           <p>Monitor progress across all assigned groups</p>
//         </div>
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <p>Loading progress data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (groups.length === 0) {
//     return (
//       <div className="progress-tracking-container">
//         <div className="progress-header">
//           <h2>Progress Tracking</h2>
//           <p>Monitor progress across all assigned groups</p>
//         </div>
//         <div className="empty-state">
//           <i className='bx bx-bar-chart'></i>
//           <p>No progress data available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="progress-tracking-container">
//       <div className="progress-header">
//         <h2>Progress Tracking</h2>
//         <p>Monitor progress across all assigned groups</p>
//       </div>

//       <div className="progress-cards-grid">
//         {groups.map((group) => (
//           <div key={group.id} className="progress-card">
//             {/* Card Header */}
//             <div className="card-top">
//               <div className="group-info">
//                 <h3>{group.groupName}</h3>
//                 <p>{group.projectTitle}</p>
//               </div>
//               <span className={`status-badge ${getStatusClass(group.status)}`}>
//                 {group.status}
//               </span>
//             </div>

//             {/* Metrics */}
//             <div className="metrics-grid">
//               <div className="metric-box">
//                 <div className="metric-icon">
//                   <i className='bx bx-slideshow'></i>
//                 </div>
//                 <div className="metric-details">
//                   <span className="metric-label">Presentations</span>
//                   <span className="metric-value">
//                     {group.presentationsAttended}/{group.totalPresentations}
//                   </span>
//                 </div>
//               </div>

//               <div className="metric-box">
//                 <div className="metric-icon">
//                   <i className='bx bx-target-lock'></i>
//                 </div>
//                 <div className="metric-details">
//                   <span className="metric-label">Milestones Completed</span>
//                   <span 
//                     className="metric-value"
//                     style={{ color: getProgressColor(group.milestonesCompleted) }}
//                   >
//                     {group.milestonesCompleted}%
//                   </span>
//                 </div>
//               </div>

//               <div className="metric-box">
//                 <div className="metric-icon">
//                   <i className='bx bx-calendar-event'></i>
//                 </div>
//                 <div className="metric-details">
//                   <span className="metric-label">Meetings</span>
//                   <span className="metric-value">{group.meetingCount}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="progress-bar-section">
//               <div className="bar-header">
//                 <span>Milestone Progress</span>
//                 <span style={{ color: getProgressColor(group.milestonesCompleted) }}>
//                   {group.milestonesCompleted}%
//                 </span>
//               </div>
//               <div className="bar-container">
//                 <div 
//                   className="bar-fill"
//                   style={{ 
//                     width: `${group.milestonesCompleted}%`,
//                     background: getProgressColor(group.milestonesCompleted)
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProgressTracking;

import React, { useState, useEffect } from 'react';
import '../styles/progressTracking.css';

const ProgressTracking = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setGroups([
        {
          id: 1,
          groupName: 'Alpha Team',
          projectTitle: 'AI Chatbot System',
          presentationsAttended: 4,
          totalPresentations: 5,
          milestonesCompleted: 85,
          meetingCount: 6,
          status: 'Ahead'
        },
        {
          id: 2,
          groupName: 'Beta Team',
          projectTitle: 'E-Commerce Platform',
          presentationsAttended: 3,
          totalPresentations: 5,
          milestonesCompleted: 60,
          meetingCount: 4,
          status: 'On Track'
        },
        {
          id: 3,
          groupName: 'Gamma Team',
          projectTitle: 'IoT Smart Home',
          presentationsAttended: 4,
          totalPresentations: 5,
          milestonesCompleted: 75,
          meetingCount: 5,
          status: 'On Track'
        },
        {
          id: 4,
          groupName: 'Delta Team',
          projectTitle: 'Blockchain Voting',
          presentationsAttended: 2,
          totalPresentations: 5,
          milestonesCompleted: 35,
          meetingCount: 3,
          status: 'Delayed'
        },
        {
          id: 5,
          groupName: 'Epsilon Team',
          projectTitle: 'Mobile Health App',
          presentationsAttended: 3,
          totalPresentations: 5,
          milestonesCompleted: 55,
          meetingCount: 4,
          status: 'On Track'
        },
        {
          id: 6,
          groupName: 'Zeta Team',
          projectTitle: 'Cloud Storage Solution',
          presentationsAttended: 1,
          totalPresentations: 5,
          milestonesCompleted: 25,
          meetingCount: 2,
          status: 'Delayed'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getProgressColor = (progress) => {
    if (progress >= 71) return '#28a745';
    if (progress >= 41) return '#ffc107';
    return '#dc3545';
  };

  const getStatusClass = (status) => {
    if (status === 'Ahead') return 'status-ahead';
    if (status === 'Delayed') return 'status-delayed';
    return 'status-ontrack';
  };

  const getBandClass = (status) => {
    if (status === 'Ahead') return 'ahead';
    if (status === 'Delayed') return 'delayed';
    return 'ontrack';
  };

  if (loading) {
    return (
      <div className="progress-tracking-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="progress-tracking-container">
        <div className="empty-state">
          <i className="bx bx-bar-chart-alt-2"></i>
          <p>No progress data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-tracking-container">
      <div className="progress-header">
        <h2>Progress Tracking</h2>
        <p>Monitor group progress and milestones</p>
      </div>

      <div className="progress-cards-grid">
        {groups.map((group) => (
          <div className="progress-card" key={group.id}>
            <div className={`card-band ${getBandClass(group.status)}`}></div>

            <div className="card-top">
              <div className="group-info">
                <h3>{group.groupName}</h3>
                <p>{group.projectTitle}</p>
              </div>
              <span className={`status-badge ${getStatusClass(group.status)}`}>
                {group.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-slideshow"></i>
                </div>
                <span className="metric-value">
                  {group.presentationsAttended}/{group.totalPresentations}
                </span>
                <span className="metric-label">Presentations</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-target-lock"></i>
                </div>
                <span
                  className="metric-value"
                  style={{ color: getProgressColor(group.milestonesCompleted) }}
                >
                  {group.milestonesCompleted}%
                </span>
                <span className="metric-label">Milestones</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-calendar-event"></i>
                </div>
                <span className="metric-value">
                  {group.meetingCount}
                </span>
                <span className="metric-label">Meetings</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar-section">
              <div className="bar-header">
                <span>Overall Progress</span>
                <span style={{ color: getProgressColor(group.milestonesCompleted) }}>
                  {group.milestonesCompleted}%
                </span>
              </div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${group.milestonesCompleted}%`,
                    backgroundColor: getProgressColor(group.milestonesCompleted)
                  }}
                ></div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracking;
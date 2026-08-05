// import React, { useState } from 'react';
// import '../styles/assignedGroups.css';

// const AssignedGroups = ({ onViewDetails }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Sample data - replace with actual API call
//   const groups = [
//     { id: 1, groupName: 'Team Alpha', projectTitle: 'AI Chatbot System', ideaStatus: 'Approved' },
//     { id: 2, groupName: 'Team Beta', projectTitle: 'E-Commerce Platform', ideaStatus: 'Pending' },
//     { id: 3, groupName: 'Team Gamma', projectTitle: 'IoT Smart Home', ideaStatus: 'Approved' },
//     { id: 4, groupName: 'Team Delta', projectTitle: 'Blockchain Voting', ideaStatus: 'Under Review' },
//     { id: 5, groupName: 'Team Epsilon', projectTitle: 'Mobile Health App', ideaStatus: 'Approved' },
//     { id: 6, groupName: 'Team Zeta', projectTitle: 'Cloud Storage Solution', ideaStatus: 'Pending' }
//   ];

//   const getStatusClass = (status) => {
//     if (status === 'Approved') return 'status-approved';
//     if (status === 'Pending') return 'status-pending';
//     return 'status-review';
//   };

//   const handleViewDetails = (group) => {
//     if (onViewDetails) {
//       onViewDetails(group);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="assigned-groups-container">
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <p>Loading groups...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="assigned-groups-container">
//         <div className="error-state">
//           <i className='bx bx-error-circle'></i>
//           <p>Failed to load groups. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   if (groups.length === 0) {
//     return (
//       <div className="assigned-groups-container">
//         <div className="empty-state">
//           <i className='bx bx-group'></i>
//           <p>No groups assigned yet</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="assigned-groups-container">
//       <div className="groups-header">
//         <h2>Assigned Groups</h2>
//         <p>Manage and monitor your assigned student groups</p>
//       </div>

//       <div className="groups-table-wrapper">
//         <table className="groups-table">
//           <thead>
//             <tr>
//               <th>Group Name</th>
//               <th>Project Title</th>
//               <th>Idea Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {groups.map((group) => (
//               <tr key={group.id}>
//                 <td>
//                   <div className="group-name">
//                     <i className='bx bx-group'></i>
//                     <span>{group.groupName}</span>
//                   </div>
//                 </td>
//                 <td className="project-title">{group.projectTitle}</td>
//                 <td>
//                   <span className={`status-badge ${getStatusClass(group.ideaStatus)}`}>
//                     {group.ideaStatus}
//                   </span>
//                 </td>
//                 <td>
//                   <button 
//                     className="view-details-btn"
//                     onClick={() => handleViewDetails(group)}
//                   >
//                     <i className='bx bx-right-arrow-alt'></i>
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssignedGroups;

import React, { useState } from 'react';
import '../styles/assignedGroups.css';

const AssignedGroups = ({ onViewDetails }) => {
  const [loading] = useState(false);
  const [error] = useState(null);

  const groups = [
    { id: 1, groupName: 'Team Alpha', projectTitle: 'AI Chatbot System', ideaStatus: 'Approved' },
    { id: 2, groupName: 'Team Beta', projectTitle: 'E-Commerce Platform', ideaStatus: 'Pending' },
    { id: 3, groupName: 'Team Gamma', projectTitle: 'IoT Smart Home', ideaStatus: 'Approved' },
    { id: 4, groupName: 'Team Delta', projectTitle: 'Blockchain Voting', ideaStatus: 'Under Review' },
    { id: 5, groupName: 'Team Epsilon', projectTitle: 'Mobile Health App', ideaStatus: 'Approved' },
    { id: 6, groupName: 'Team Zeta', projectTitle: 'Cloud Storage Solution', ideaStatus: 'Pending' }
  ];

  const getStatusClass = (status) => {
    if (status === 'Approved') return 'status-approved';
    if (status === 'Pending') return 'status-pending';
    return 'status-review';
  };

  const handleViewDetails = (group) => {
    if (onViewDetails) {
      onViewDetails(group);
    }
  };

  if (loading) {
    return (
      <div className="assigned-groups-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading groups...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assigned-groups-container">
        <div className="error-state">
          <i className="bx bx-error-circle"></i>
          <p>Failed to load groups. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="assigned-groups-container">
        <div className="empty-state">
          <i className="bx bx-group"></i>
          <p>No groups assigned yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="assigned-groups-container">
      <div className="groups-header">
        <div>
          <h2>Assigned Groups</h2>
          <p>Manage and monitor your assigned student groups</p>
        </div>
        <span className="groups-count-badge">
          <i className="bx bx-group"></i>
          {groups.length} Groups
        </span>
      </div>

      <div className="groups-table-wrapper">
        <table className="groups-table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Project Title</th>
              <th>Idea Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>
                  <div className="group-name">
                    <div className="group-avatar">{group.groupName.charAt(0)}</div>
                    <span className="group-name-text">{group.groupName}</span>
                  </div>
                </td>
                <td className="project-title">{group.projectTitle}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(group.ideaStatus)}`}>
                    {group.ideaStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(group)}
                  >
                    <i className="bx bx-right-arrow-alt"></i>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedGroups;
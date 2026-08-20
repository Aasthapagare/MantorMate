import React, { useEffect, useState } from 'react';
import { getGuideGroups } from '../services/guideAttendanceService';

const AssignedGroups = ({ onViewDetails }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await getGuideGroups();
        setGroups(data || []);
      } catch (error) {
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  if (loading) {
    return (
      <div className="assigned-groups-container">
        <div className="assigned-header">
          <span className="assigned-kicker">Guide Workspace</span>
          <h2>Assigned Groups</h2>
        </div>
        <p>Loading assigned groups...</p>
      </div>
    );
  }

  return (
    <div className="assigned-groups-container">
      <div className="assigned-header">
        <span className="assigned-kicker">Guide Workspace</span>
        <h2>Assigned Groups</h2>
        <p>Open any team to check submitted project details and student members.</p>
      </div>
      <div className="groups-grid">
        {groups.map((group) => (
          <div
            key={group.groupId}
            className="group-card"
            onClick={() => onViewDetails && onViewDetails(group)}
          >
            <div className="group-top">
              <div className="group-avatar">
                <i className='bx bx-group'></i>
              </div>
              <div className="group-top-copy">
                <h3>{group.groupName}</h3>
                <span className="group-id">Group #{group.groupId}</span>
              </div>
            </div>
            <p className="project-title">{group.projectTitle || 'Project not submitted'}</p>
            <div className="group-info">
              <span className="student-count">
                <i className='bx bx-user'></i>
                Students: {(group.memberDetails || group.members || []).length}
              </span>
              <span className={`status ${(group.ideaStatus || 'PENDING').toLowerCase().replace('_', '-')}`}>
                {group.ideaStatus || 'PENDING'}
              </span>
            </div>
            <div className="group-card-footer">
              <span>View details</span>
              <i className='bx bx-chevron-right'></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedGroups;

import React from 'react';
import '../styles/groupDetails.css';

const GroupDetails = ({ group, onBack }) => {
  return (
    <div className="group-details-container">

      {/* Header */}
      <div className="details-header">
        <button className="back-btn" onClick={onBack}>
          <i className='bx bx-arrow-back'></i>
          Back to Assigned Groups
        </button>

        <h2>{group.groupName}</h2>
        <p>Group ID: {group.groupId}</p>
      </div>

      {/* Group Info */}
      <div className="detail-card">
        <div className="card-header">
          <i className='bx bx-group'></i>
          <h3>Group Information</h3>
        </div>
        <div className="card-content">
          <div className="info-row">
            <span className="label">Leader ID:</span>
            <span>{group.leaderId}</span>
          </div>

          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status-badge status-${group.ideaStatus?.toLowerCase()}`}>
              {group.ideaStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="detail-card">
        <div className="card-header">
          <i className='bx bx-user'></i>
          <h3>Team Members</h3>
        </div>

        <div className="card-content">
          {group.members && group.members.length > 0 ? (
            <div className="students-grid">
              {group.members.map((member, index) => (
                <div key={index} className="student-item">
                  <div className="student-avatar">
                    {member.charAt(0).toUpperCase()}
                  </div>

                  <div className="student-info">
                    <h4>{member}</h4>
                    <p className="member-id">User ID</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <i className='bx bx-info-circle'></i>
              <p>No members found</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Idea */}
      <div className="detail-card">
        <div className="card-header">
          <i className='bx bx-bulb'></i>
          <h3>Project Idea</h3>
        </div>

        <div className="card-content">
          <h4 className="project-title">{group.projectTitle}</h4>

          <div className="project-description">
            <h5>Description:</h5>
            <p>
              {group.projectIdea || "No description provided"}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GroupDetails;
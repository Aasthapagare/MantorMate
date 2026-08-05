import React from 'react';
import '../styles/groupDetails.css';

const GroupDetails = ({ group, onBack }) => {
  // Sample student data - in real app, this would come from API
  const students = [
    { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001', email: 'arjun@example.com' },
    { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002', email: 'sneha@example.com' },
    { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003', email: 'rahul@example.com' },
    { id: 4, name: 'Priya Desai', enrollment: '0827CS211004', email: 'priya@example.com' },
    { id: 5, name: 'Karan Singh', enrollment: '0827CS211005', email: 'karan@example.com' }
  ];

  return (
    <div className="group-details-container">
      <div className="details-header">
        <h2>Group Details</h2>
        <p>Complete information about the selected group</p>
      </div>

      {/* Group Name Card */}
      <div className="detail-card">
        <div className="card-header">
          <i className='bx bx-group'></i>
          <h3>Group Name</h3>
        </div>
        <div className="card-content">
          <p className="group-name-text">{group.groupName}</p>
        </div>
      </div>

      {/* Students Card */}
      <div className="detail-card">
        <div className="card-header">
          <i className='bx bx-user'></i>
          <h3>Team Members</h3>
        </div>
        <div className="card-content">
          {students && students.length > 0 ? (
            <div className="students-grid">
              {students.map((student) => (
                <div key={student.id} className="student-item">
                  <div className="student-avatar">
                    {student.name.charAt(0)}
                  </div>
                  <div className="student-info">
                    <h4>{student.name}</h4>
                    <p className="enrollment">{student.enrollment}</p>
                    <p className="email">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <i className='bx bx-info-circle'></i>
              <p>Student information not available</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Idea Card */}
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
              This project aims to develop {group.projectTitle.toLowerCase()} using modern technologies 
              and best practices. The team will work on implementing core features, testing, 
              and deployment phases throughout the semester.
            </p>
          </div>
          <div className="project-meta">
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className={`status-badge status-${group.ideaStatus.toLowerCase().replace(' ', '-')}`}>
                {group.ideaStatus}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Submitted:</span>
              <span className="meta-value">March 15, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
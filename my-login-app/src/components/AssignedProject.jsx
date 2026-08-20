import React from 'react';

const AssignedProject = () => {
  const assignedProject = {
    hasProject: false,
    projectName: '',
    guide: '',
    assignedDate: '',
    deadline: '',
    description: ''
  };

  return (
    <div className="assigned-project-section">
      <h2 className="section-title">Assigned Project</h2>
      
      {assignedProject.hasProject ? (
        <div className="assigned-project-card">
          <div className="project-header-section">
            <div className="project-icon-wrapper">
              <i className='bx bx-briefcase'></i>
            </div>
            <div className="project-info">
              <h3 className="project-name">{assignedProject.projectName}</h3>
              <p className="project-guide">
                <i className='bx bx-user-circle'></i>
                Guide: {assignedProject.guide}
              </p>
            </div>
          </div>
          
          <p className="project-description">{assignedProject.description}</p>
          
          <div className="project-dates">
            <div className="date-item">
              <i className='bx bx-calendar-check'></i>
              <div>
                <span className="date-label">Assigned</span>
                <span className="date-value">{assignedProject.assignedDate}</span>
              </div>
            </div>
            <div className="date-item">
              <i className='bx bx-calendar-exclamation'></i>
              <div>
                <span className="date-label">Deadline</span>
                <span className="date-value">{assignedProject.deadline}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-project-card">
          <i className='bx bx-folder-open'></i>
          <p className="no-project-text">No project assigned yet</p>
          <p className="no-project-subtext">Your assigned project will appear here once a mentor assigns it to you.</p>
        </div>
      )}
    </div>
  );
};

export default AssignedProject;

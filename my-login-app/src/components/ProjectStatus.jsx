import React from 'react';

const ProjectStatus = () => {
  const projectStatus = {
    status: 'In Progress',
    phase: 'Development',
    completionPercentage: 65,
    lastUpdated: 'Jan 25, 2026'
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return '#27ae60';
      case 'in progress':
        return '#f39c12';
      case 'pending':
        return '#e74c3c';
      default:
        return '#9ca3af';
    }
  };

  return (
    <div className="project-status-section">
      <h2 className="section-title">Project Status</h2>
      
      <div className="project-status-card">
        <div className="status-header">
          <div className="status-info">
            <span 
              className="status-badge"
              style={{ backgroundColor: `${getStatusColor(projectStatus.status)}15`, color: getStatusColor(projectStatus.status) }}
            >
              <i className='bx bx-pulse'></i>
              {projectStatus.status}
            </span>
            <p className="status-phase">Phase: {projectStatus.phase}</p>
          </div>
          <div className="status-date">
            <i className='bx bx-time'></i>
            Last Updated: {projectStatus.lastUpdated}
          </div>
        </div>
        
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Overall Progress</span>
            <span className="progress-percentage">{projectStatus.completionPercentage}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-filled"
              style={{ width: `${projectStatus.completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;
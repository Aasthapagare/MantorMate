import React, { useState } from 'react';

const ProjectIdeaSubmission = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showApprovalStatus, setShowApprovalStatus] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: ''
  });

  // Dummy approval status
  const approvalStatus = {
    status: 'Pending',
    submittedDate: '2026-02-05',
    reviewedBy: null,
    comments: 'Your project idea is under review by the faculty committee.'
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('projectManagement');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Idea Submitted:', formData);
    // TODO: Implement submission logic
    alert('Project idea submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return '#1abc9c';
      case 'Pending': return '#f39c12';
      case 'Rejected': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return 'bx-check-circle';
      case 'Pending': return 'bx-time-five';
      case 'Rejected': return 'bx-x-circle';
      default: return 'bx-help-circle';
    }
  };

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="dashboard-wrapper">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="back-button" onClick={handleBack}>
              <i className='bx bx-arrow-back'></i>
              <span>Back</span>
            </button>
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

        <div className="sub-page-container">
          <main className="sub-page-content">
            <div className="page-header">
              <h2 className="page-title">
                <i className='bx bx-bulb'></i>
                Project Idea Submission
              </h2>
              <p className="page-subtitle">Submit your innovative project idea</p>
            </div>

            {/* Toggle between form and status */}
            <div className="action-buttons">
              <button 
                className={`toggle-btn ${!showApprovalStatus ? 'active' : ''}`}
                onClick={() => setShowApprovalStatus(false)}
              >
                <i className='bx bx-edit'></i>
                Submit Idea
              </button>
              <button 
                className={`toggle-btn ${showApprovalStatus ? 'active' : ''}`}
                onClick={() => setShowApprovalStatus(true)}
              >
                <i className='bx bx-list-check'></i>
                View Approval Status
              </button>
            </div>

            {!showApprovalStatus ? (
              /* Project Idea Form */
              <div className="form-container">
                <form onSubmit={handleSubmit} className="project-form">
                  <div className="form-group">
                    <label htmlFor="title">
                      <i className='bx bx-text'></i>
                      Project Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your project title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">
                      <i className='bx bx-detail'></i>
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project idea in detail..."
                      rows="6"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="domain">
                      <i className='bx bx-code-alt'></i>
                      Domain / Technology
                    </label>
                    <select
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Domain</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="ml">Machine Learning</option>
                      <option value="iot">Internet of Things</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="cloud">Cloud Computing</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="data-science">Data Science</option>
                      <option value="robotics">Robotics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button type="submit" className="submit-btn">
                    <i className='bx bx-send'></i>
                    Submit Project Idea
                  </button>
                </form>
              </div>
            ) : (
              /* Approval Status Section */
              <div className="status-container">
                <div className="status-card">
                  <div className="status-header">
                    <div 
                      className="status-icon"
                      style={{ backgroundColor: getStatusColor(approvalStatus.status) }}
                    >
                      <i className={`bx ${getStatusIcon(approvalStatus.status)}`}></i>
                    </div>
                    <div className="status-info">
                      <h3>Approval Status</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(approvalStatus.status) }}
                      >
                        {approvalStatus.status}
                      </span>
                    </div>
                  </div>

                  <div className="status-details">
                    <div className="detail-row">
                      <i className='bx bx-calendar'></i>
                      <div>
                        <strong>Submitted Date:</strong>
                        <span>{approvalStatus.submittedDate}</span>
                      </div>
                    </div>

                    {approvalStatus.reviewedBy && (
                      <div className="detail-row">
                        <i className='bx bx-user'></i>
                        <div>
                          <strong>Reviewed By:</strong>
                          <span>{approvalStatus.reviewedBy}</span>
                        </div>
                      </div>
                    )}

                    <div className="detail-row">
                      <i className='bx bx-message-detail'></i>
                      <div>
                        <strong>Comments:</strong>
                        <p>{approvalStatus.comments}</p>
                      </div>
                    </div>
                  </div>

                  {approvalStatus.status === 'Pending' && (
                    <div className="pending-message">
                      <i className='bx bx-info-circle'></i>
                      <p>Your project idea is currently being reviewed. You will be notified once a decision is made.</p>
                    </div>
                  )}

                  {approvalStatus.status === 'Approved' && (
                    <div className="approved-message">
                      <i className='bx bx-check-circle'></i>
                      <p>Congratulations! Your project idea has been approved. You can now proceed to the next steps.</p>
                    </div>
                  )}

                  {approvalStatus.status === 'Rejected' && (
                    <div className="rejected-message">
                      <i className='bx bx-x-circle'></i>
                      <p>Your project idea was not approved. Please review the comments and submit a revised proposal.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .sub-page-container {
          width: 100%;
          min-height: calc(100vh - 80px);
          background: var(--bg-primary);
        }

        .sub-page-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 1.5rem;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-3px);
        }

        .back-button i {
          font-size: 1.25rem;
        }

        .page-header {
          margin-bottom: 2rem;
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

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .toggle-btn {
          padding: 0.9rem 1.75rem;
          background: var(--card-bg);
          color: var(--text-primary);
          border: 2px solid transparent;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .toggle-btn i {
          font-size: 1.25rem;
        }

        .toggle-btn:hover {
          border-color: var(--accent-color);
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          color: white;
          border-color: var(--accent-color);
        }

        .form-container {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: var(--shadow);
        }

        .project-form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .form-group label {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group label i {
          font-size: 1.25rem;
          color: var(--accent-color);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 0.9rem 1.1rem;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-size: 1rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(52, 73, 94, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .submit-btn {
          padding: 1.1rem;
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .submit-btn i {
          font-size: 1.5rem;
        }

        .status-container {
          display: flex;
          justify-content: center;
        }

        .status-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: var(--shadow);
          width: 100%;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }

        .status-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .status-icon i {
          font-size: 3rem;
          color: white;
        }

        .status-info h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
        }

        .status-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .detail-row i {
          font-size: 1.5rem;
          color: var(--accent-color);
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .detail-row div {
          flex: 1;
        }

        .detail-row strong {
          display: block;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }

        .detail-row span,
        .detail-row p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .pending-message,
        .approved-message,
        .rejected-message {
          margin-top: 2rem;
          padding: 1.25rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pending-message {
          background: rgba(243, 156, 18, 0.1);
          border-left: 4px solid #f39c12;
        }

        .approved-message {
          background: rgba(26, 188, 156, 0.1);
          border-left: 4px solid #1abc9c;
        }

        .rejected-message {
          background: rgba(231, 76, 60, 0.1);
          border-left: 4px solid #e74c3c;
        }

        .pending-message i,
        .approved-message i,
        .rejected-message i {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .pending-message i {
          color: #f39c12;
        }

        .approved-message i {
          color: #1abc9c;
        }

        .rejected-message i {
          color: #e74c3c;
        }

        .pending-message p,
        .approved-message p,
        .rejected-message p {
          color: var(--text-primary);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .sub-page-content {
            padding: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .form-container,
          .status-card {
            padding: 1.75rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .toggle-btn {
            width: 100%;
            justify-content: center;
          }

          .back-button {
            margin-right: 1rem;
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .back-button span {
            display: none;
          }

          .status-header {
            flex-direction: column;
            text-align: center;
          }

          .status-icon {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.75rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .form-container,
          .status-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectIdeaSubmission;
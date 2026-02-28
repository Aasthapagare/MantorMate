import React, { useState } from 'react';

const UploadedFiles = () => {
  const [hoveredFile, setHoveredFile] = useState(null);

  // Sample files data - sorted by date (newest first)
  const files = [
    { 
      id: 1, 
      name: 'Project_Proposal_Final.pdf', 
      status: 'approved', 
      uploadDate: 'Jan 23, 2026' 
    },
    { 
      id: 2, 
      name: 'Research_Document_v2.docx', 
      status: 'pending', 
      uploadDate: 'Jan 22, 2026' 
    },
    { 
      id: 3, 
      name: 'Design_Mockups.fig', 
      status: 'rejected', 
      uploadDate: 'Jan 21, 2026' 
    },
    { 
      id: 4, 
      name: 'Code_Review_Notes.txt', 
      status: 'approved', 
      uploadDate: 'Jan 20, 2026' 
    },
    { 
      id: 5, 
      name: 'Meeting_Minutes.pdf', 
      status: 'pending', 
      uploadDate: 'Jan 19, 2026' 
    },
    { 
      id: 6, 
      name: 'Progress_Report_Week1.docx', 
      status: 'approved', 
      uploadDate: 'Jan 18, 2026' 
    },
    { 
      id: 7, 
      name: 'Implementation_Plan.xlsx', 
      status: 'rejected', 
      uploadDate: 'Jan 17, 2026' 
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return { icon: 'bx-check-circle', color: '#27ae60' };
      case 'rejected':
        return { icon: 'bx-x-circle', color: '#e74c3c' };
      case 'pending':
        return { icon: 'bx-time-five', color: '#f39c12' };
      default:
        return { icon: 'bx-file', color: '#95a5a6' };
    }
  };

  return (
    <div className="uploaded-files-section">
      <h2 className="section-title">Uploaded Files</h2>
      
      <div className="uploaded-files-container">
        <div className="files-list">
          {files.map(file => {
            const statusInfo = getStatusIcon(file.status);
            return (
              <div 
                key={file.id}
                className="file-item"
                onMouseEnter={() => setHoveredFile(file.id)}
                onMouseLeave={() => setHoveredFile(null)}
              >
                <div className="file-name">
                  <i className='bx bx-file'></i>
                  <span>{file.name}</span>
                </div>
                <div className="file-status">
                  <i 
                    className={`bx ${statusInfo.icon}`}
                    style={{ color: statusInfo.color }}
                  ></i>
                </div>
                {hoveredFile === file.id && (
                  <div className="file-date-tooltip">
                    Uploaded on {file.uploadDate}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;
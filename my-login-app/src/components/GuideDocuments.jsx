import React, { useEffect, useState } from 'react';
import { getGuideGroups } from '../services/guideAttendanceService';
import { buildDocumentUrl, getGuideDocuments } from '../services/documentService';
import '../styles/projectManagement.css';

const GuideDocuments = ({ onBack }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoadingGroups(true);
        const data = await getGuideGroups();
        const normalizedGroups = Array.isArray(data) ? data : [];
        setGroups(normalizedGroups);
        if (normalizedGroups.length > 0) {
          setSelectedGroupId(String(normalizedGroups[0].groupId));
        }
      } catch (loadError) {
        console.error('Guide groups load error:', loadError);
        setError(loadError.message || 'Guide groups load nahi ho sake.');
      } finally {
        setLoadingGroups(false);
      }
    };

    loadGroups();
  }, []);

  useEffect(() => {
    const loadDocuments = async () => {
      if (!selectedGroupId) {
        setDocuments([]);
        return;
      }

      try {
        setLoadingDocs(true);
        setError('');
        const data = await getGuideDocuments(selectedGroupId);
        setDocuments(Array.isArray(data) ? data : []);
      } catch (loadError) {
        console.error('Guide documents load error:', loadError);
        setError(loadError.message || 'Documents load nahi ho sake.');
      } finally {
        setLoadingDocs(false);
      }
    };

    loadDocuments();
  }, [selectedGroupId]);

  return (
    <div className="project-management-wrapper">
      <div className="pm-header">
        <button className="back-btn" onClick={onBack}>
          <i className="bx bx-arrow-back"></i>
          Back to Dashboard
        </button>
        <h1>Student Documents</h1>
        <p>Assigned groups ke uploaded files yahan dekho.</p>
      </div>

      <div className="guide-documents-panel">
        <div className="guide-documents-toolbar">
          <div className="guide-documents-toolbar-copy">
            <span className="guide-documents-kicker">Guide File Desk</span>
            <h2>Review uploaded files by group</h2>
            <p>Pick an assigned group and open submitted files directly from this workspace.</p>
          </div>

          <label className="guide-documents-select-wrap">
            <span>Select Group</span>
            <select
              value={selectedGroupId}
              onChange={(event) => setSelectedGroupId(event.target.value)}
              disabled={loadingGroups || groups.length === 0}
            >
              {groups.length === 0 && <option value="">No assigned groups</option>}
              {groups.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                  {group.groupName || `Group ${group.groupId}`}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && <div className="document-banner error">{error}</div>}

        <div className="guide-documents-summary-grid">
          <div className="guide-documents-summary-card">
            <span>Assigned Groups</span>
            <strong>{groups.length}</strong>
          </div>
          <div className="guide-documents-summary-card">
            <span>Visible Files</span>
            <strong>{documents.length}</strong>
          </div>
        </div>

        <div className="uploaded-files-container guide-documents-files-shell">
          {loadingGroups || loadingDocs ? (
            <div className="file-empty-state">
              <i className="bx bx-loader-alt bx-spin"></i>
              <p>Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="file-empty-state">
              <i className="bx bx-folder-open"></i>
              <p>No documents available for this group.</p>
            </div>
          ) : (
            <div className="files-list">
              {documents.map((document) => (
                <a
                  key={document.id}
                  className="file-item guide-document-item"
                  href={buildDocumentUrl(document.fileUrl)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="file-name">
                    <i className="bx bx-file"></i>
                    <div className="file-meta">
                      <span>{document.fileName}</span>
                      <small>Uploaded by {document.uploadedBy}</small>
                    </div>
                  </div>
                  <div className="file-status">
                    <span className="guide-document-open-chip">
                      Open
                      <i className="bx bx-link-external"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDocuments;

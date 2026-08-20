import React, { useEffect, useMemo, useState } from 'react';
import {
  buildDocumentUrl,
  deleteStudentDocument,
  getStudentDocuments,
  getStudentGroupId,
  uploadStudentDocument
} from '../services/documentService';

const formatUploadDate = (documentId) => {
  if (!documentId) {
    return 'Recently uploaded';
  }
  return `Document #${documentId}`;
};

const UploadedFiles = () => {
  const [hoveredFile, setHoveredFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  const currentUserId = localStorage.getItem('userId');

  const loadDocuments = async (resolvedGroupId) => {
    const docs = await getStudentDocuments(resolvedGroupId);
    setDocuments(Array.isArray(docs) ? docs : []);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError('');
        if (!currentUserId) {
          setDocuments([]);
          return;
        }

        const resolvedGroupId = await getStudentGroupId(currentUserId);
        setGroupId(resolvedGroupId);
        await loadDocuments(resolvedGroupId);
      } catch (loadError) {
        console.error('Student documents load error:', loadError);
        setError(loadError.message || 'Documents load nahi ho sake.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [currentUserId]);

  const sortedDocuments = useMemo(
    () => [...documents].sort((left, right) => (right.id || 0) - (left.id || 0)),
    [documents]
  );

  const ownUploadsCount = useMemo(
    () => sortedDocuments.filter((file) => String(file.uploadedBy || '').trim() === String(currentUserId || '').trim()).length,
    [currentUserId, sortedDocuments]
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !groupId) {
      return;
    }

    try {
      setUploading(true);
      setError('');
      await uploadStudentDocument(groupId, file);
      await loadDocuments(groupId);
      event.target.value = '';
    } catch (uploadError) {
      console.error('Document upload error:', uploadError);
      setError(uploadError.message || 'Document upload nahi ho saka.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (event, documentId) => {
    event.preventDefault();
    event.stopPropagation();

    if (!groupId || !documentId) {
      return;
    }

    try {
      setDeletingId(documentId);
      setError('');
      await deleteStudentDocument(groupId, documentId);
      await loadDocuments(groupId);
    } catch (deleteError) {
      console.error('Document delete error:', deleteError);
      setError(deleteError.message || 'Document delete nahi ho saka.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="uploaded-files-section">
      <div className="uploaded-files-card">
        <div className="uploaded-files-top">
          <div>
            <span className="uploaded-files-kicker">Uploaded Files</span>
            <h3>Project documents in one box</h3>
            <p className="uploaded-files-subtitle">Guide ke saath shared documents yahan neatly grouped rahenge, bilkul upcoming meeting card ki tarah.</p>
          </div>

          <label className={`document-upload-btn ${uploading || !groupId ? 'disabled' : ''}`}>
            <i className={`bx ${uploading ? 'bx-loader-alt bx-spin' : 'bx-upload'}`}></i>
            <span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
            <input type="file" onChange={handleFileUpload} disabled={uploading || !groupId} hidden />
          </label>
        </div>

        <div className="uploaded-files-stats">
          <div className="uploaded-files-stat">
            <span className="uploaded-files-stat-label">Total Files</span>
            <strong>{sortedDocuments.length}</strong>
          </div>
          <div className="uploaded-files-stat">
            <span className="uploaded-files-stat-label">Your Uploads</span>
            <strong>{ownUploadsCount}</strong>
          </div>
        </div>

        {error && <div className="document-banner error">{error}</div>}

        <div className="uploaded-files-container">
          {loading ? (
            <div className="file-empty-state">
              <i className="bx bx-loader-alt bx-spin"></i>
              <p>Loading documents...</p>
            </div>
          ) : sortedDocuments.length === 0 ? (
            <div className="file-empty-state">
              <i className="bx bx-folder-open"></i>
              <p>No documents uploaded yet.</p>
            </div>
          ) : (
            <div className="files-list">
              {sortedDocuments.map((file) => {
                const canDelete = String(file.uploadedBy || '').trim() === String(currentUserId || '').trim();

                return (
                  <a
                    key={file.id}
                    className="file-item"
                    href={buildDocumentUrl(file.fileUrl)}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setHoveredFile(file.id)}
                    onMouseLeave={() => setHoveredFile(null)}
                  >
                    <div className="file-name">
                      <div className="file-icon-shell">
                        <i className="bx bx-file"></i>
                      </div>
                      <div className="file-meta">
                        <span className="file-title">{file.fileName}</span>
                        <div className="file-meta-row">
                          <small>Uploaded by {file.uploadedBy}</small>
                          <span className="file-chip">{formatUploadDate(file.id)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="file-status">
                      <span className="file-open-label">Open</span>
                      <i className="bx bx-link-external"></i>
                      {canDelete && (
                        <button
                          type="button"
                          className="file-delete-btn"
                          onClick={(event) => handleDeleteDocument(event, file.id)}
                          disabled={deletingId === file.id}
                          title="Delete document"
                        >
                          <i className={`bx ${deletingId === file.id ? 'bx-loader-alt bx-spin' : 'bx-trash'}`}></i>
                        </button>
                      )}
                    </div>
                    {hoveredFile === file.id && (
                      <div className="file-date-tooltip">
                        {formatUploadDate(file.id)}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadedFiles;

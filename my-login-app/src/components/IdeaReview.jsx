import React, { useEffect, useState } from 'react';
import '../styles/ideaReview.css';
import { getGuideGroups, reviewProjectIdea } from '../services/guideAttendanceService';

const IdeaReview = () => {
  const [ideas, setIdeas] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const groups = await getGuideGroups();
        setIdeas((groups || [])
          .filter((group) => group.projectTitle || group.projectIdea)
          .map((group) => ({
            id: group.groupId,
            teamName: group.groupName,
            ideaName: group.projectTitle || 'Untitled Project',
            description: group.projectIdea || 'No project description submitted yet.',
            status: formatStatus(group.ideaStatus || 'PENDING')
          })));
      } catch (error) {
        setIdeas([]);
      }
    };

    loadIdeas();
  }, []);

  const formatStatus = (status) => {
    if (status === 'PENDING') return 'Pending';
    if (status === 'APPROVED') return 'Approved';
    if (status === 'REJECTED') return 'Rejected';
    return status;
  };

  const handleApprove = (idea) => {
    setSelectedIdea(idea);
    setPendingAction('Approved');
    setShowConfirmation(true);
  };

  const handleReject = (idea) => {
    setSelectedIdea(idea);
    setPendingAction('Rejected');
    setShowConfirmation(true);
  };

  const confirmAction = async () => {
    try {
      await reviewProjectIdea(selectedIdea.id, pendingAction.toUpperCase());
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === selectedIdea.id ? { ...idea, status: pendingAction } : idea
        )
      );
    } catch (error) {
      alert(error.message || 'Failed to update idea review status.');
    } finally {
      setShowConfirmation(false);
      setSelectedIdea(null);
      setPendingAction(null);
    }
  };

  const pendingIdeas = ideas.filter((idea) => idea.status === 'Pending');
  const reviewedIdeas = ideas.filter((idea) => idea.status !== 'Pending');

  const getCardClass = (status) => {
    if (status === 'Approved') return 'idea-card approved-card';
    if (status === 'Rejected') return 'idea-card rejected-card';
    return 'idea-card pending-card';
  };

  return (
    <div className="idea-review-container">
      <div className="review-header">
        <h2>Idea Review</h2>
        <p>Review ideas from your assigned groups</p>
      </div>

      {pendingIdeas.length > 0 && (
        <div className="ideas-section">
          <h3 className="section-heading">
            <i className="bx bx-time-five"></i>
            Pending Review ({pendingIdeas.length})
          </h3>
          <div className="ideas-grid">
            {pendingIdeas.map((idea) => (
              <div key={idea.id} className={getCardClass(idea.status)}>
                <div className="idea-body">
                  <div className="idea-header">
                    <div className="team-info">
                      <div className="team-avatar">{idea.teamName.charAt(0)}</div>
                      <h4>{idea.teamName}</h4>
                    </div>
                    <span className="status-badge status-pending">PENDING</span>
                  </div>

                  <div className="idea-content">
                    <h3 className="idea-title">
                      <i className="bx bx-bulb"></i>
                      {idea.ideaName}
                    </h3>
                    <p className="idea-description">{idea.description}</p>
                  </div>
                </div>

                <div className="idea-footer">
                  <div className="idea-actions">
                    <button className="approve-btn" onClick={() => handleApprove(idea)}>
                      <i className="bx bx-check"></i>
                      Approve
                    </button>
                    <button className="reject-btn" onClick={() => handleReject(idea)}>
                      <i className="bx bx-x"></i>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewedIdeas.length > 0 && (
        <div className="ideas-section">
          <h3 className="section-heading">
            <i className="bx bx-check-circle"></i>
            Reviewed ({reviewedIdeas.length})
          </h3>
          <div className="ideas-grid">
            {reviewedIdeas.map((idea) => (
              <div key={idea.id} className={getCardClass(idea.status)}>
                <div className="idea-body">
                  <div className="idea-header">
                    <div className="team-info">
                      <div className="team-avatar">{idea.teamName.charAt(0)}</div>
                      <h4>{idea.teamName}</h4>
                    </div>
                    <span className={`status-badge status-${idea.status.toLowerCase()}`}>
                      {idea.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="idea-content">
                    <h3 className="idea-title">
                      <i className="bx bx-bulb"></i>
                      {idea.ideaName}
                    </h3>
                    <p className="idea-description">{idea.description}</p>
                  </div>
                </div>

                <div className="reviewed-status">
                  <i className={idea.status === 'Approved' ? 'bx bx-check-circle' : 'bx bx-x-circle'}></i>
                  <span>{idea.status === 'Approved' ? 'Idea Approved' : 'Idea Rejected'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ideas.length === 0 && (
        <div className="empty-state">
          <i className="bx bx-bulb"></i>
          <p>No project ideas submitted yet</p>
        </div>
      )}

      {showConfirmation && selectedIdea && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <div className="modal-icon">
              <i className={pendingAction === 'Approved' ? 'bx bx-check-circle' : 'bx bx-x-circle'}></i>
            </div>
            <h3>{pendingAction === 'Approved' ? 'Approve Idea?' : 'Reject Idea?'}</h3>
            <p>
              Are you sure you want to {pendingAction === 'Approved' ? 'approve' : 'reject'} the idea{' '}
              <strong>"{selectedIdea.ideaName}"</strong> by <strong>{selectedIdea.teamName}</strong>?
            </p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>Cancel</button>
              <button
                className={pendingAction === 'Approved' ? 'confirm-approve-btn' : 'confirm-reject-btn'}
                onClick={confirmAction}
              >
                Yes, {pendingAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaReview;

// import React, { useState } from 'react';
// import '../styles/ideaReview.css';

// const IdeaReview = ({ onBack }) => {
//   const [ideas, setIdeas] = useState([
//     {
//       id: 1,
//       teamName: 'Team Alpha',
//       ideaName: 'AI Chatbot System',
//       description: 'An intelligent chatbot system for student assistance using natural language processing and machine learning. The system will help students with queries, course information, and general guidance.',
//       status: 'Pending',
//       submittedDate: 'March 15, 2026'
//     },
//     {
//       id: 2,
//       teamName: 'Team Beta',
//       ideaName: 'E-Commerce Platform',
//       description: 'A full-featured e-commerce platform with product management, cart functionality, payment integration, and order tracking. Focused on providing seamless shopping experience.',
//       status: 'Pending',
//       submittedDate: 'March 16, 2026'
//     },
//     {
//       id: 3,
//       teamName: 'Team Gamma',
//       ideaName: 'IoT Smart Home System',
//       description: 'Internet of Things based smart home automation system with mobile app control. Features include lighting control, temperature monitoring, and security alerts.',
//       status: 'Pending',
//       submittedDate: 'March 17, 2026'
//     },
//     {
//       id: 4,
//       teamName: 'Team Delta',
//       ideaName: 'Blockchain Voting System',
//       description: 'Secure and transparent voting system using blockchain technology. Ensures vote integrity, anonymity, and prevents tampering with immutable ledger.',
//       status: 'Pending',
//       submittedDate: 'March 18, 2026'
//     }
//   ]);

//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedIdea, setSelectedIdea] = useState(null);
//   const [pendingAction, setPendingAction] = useState(null);

//   const handleApprove = (idea) => {
//     setSelectedIdea(idea);
//     setPendingAction('Approved');
//     setShowConfirmation(true);
//   };

//   const handleReject = (idea) => {
//     setSelectedIdea(idea);
//     setPendingAction('Rejected');
//     setShowConfirmation(true);
//   };

//   const confirmAction = () => {
//     setIdeas(ideas.map(idea => 
//       idea.id === selectedIdea.id 
//         ? { ...idea, status: pendingAction }
//         : idea
//     ));
//     setShowConfirmation(false);
//     setSelectedIdea(null);
//     setPendingAction(null);
//   };

//   const cancelAction = () => {
//     setShowConfirmation(false);
//     setSelectedIdea(null);
//     setPendingAction(null);
//   };

//   const pendingIdeas = ideas.filter(idea => idea.status === 'Pending');
//   const reviewedIdeas = ideas.filter(idea => idea.status !== 'Pending');

//   return (
//     <div className="idea-review-container">
//       <div className="review-header">
//         <h2>Idea Review</h2>
//         <p>Review and approve project ideas submitted by student teams</p>
//       </div>

//       {/* Pending Ideas */}
//       {pendingIdeas.length > 0 && (
//         <div className="ideas-section">
//           <h3 className="section-heading">
//             <i className='bx bx-time-five'></i>
//             Pending Review ({pendingIdeas.length})
//           </h3>
//           <div className="ideas-grid">
//             {pendingIdeas.map((idea) => (
//               <div key={idea.id} className="idea-card pending-card">
//                 <div className="idea-header">
//                   <div className="team-info">
//                     <i className='bx bx-group'></i>
//                     <h4>{idea.teamName}</h4>
//                   </div>
//                   <span className="status-badge status-pending">PENDING</span>
//                 </div>

//                 <div className="idea-content">
//                   <h3 className="idea-title">
//                     <i className='bx bx-bulb'></i>
//                     {idea.ideaName}
//                   </h3>
//                   <p className="idea-description">{idea.description}</p>
                  
//                   <div className="idea-meta">
//                     <span className="meta-date">
//                       <i className='bx bx-calendar'></i>
//                       {idea.submittedDate}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="idea-actions">
//                   <button 
//                     className="approve-btn"
//                     onClick={() => handleApprove(idea)}
//                   >
//                     <i className='bx bx-check-circle'></i>
//                     Approve
//                   </button>
//                   <button 
//                     className="reject-btn"
//                     onClick={() => handleReject(idea)}
//                   >
//                     <i className='bx bx-x-circle'></i>
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Reviewed Ideas */}
//       {reviewedIdeas.length > 0 && (
//         <div className="ideas-section">
//           <h3 className="section-heading">
//             <i className='bx bx-check-double'></i>
//             Reviewed ({reviewedIdeas.length})
//           </h3>
//           <div className="ideas-grid">
//             {reviewedIdeas.map((idea) => (
//               <div key={idea.id} className={`idea-card ${idea.status.toLowerCase()}-card`}>
//                 <div className="idea-header">
//                   <div className="team-info">
//                     <i className='bx bx-group'></i>
//                     <h4>{idea.teamName}</h4>
//                   </div>
//                   <span className={`status-badge status-${idea.status.toLowerCase()}`}>
//                     {idea.status.toUpperCase()}
//                   </span>
//                 </div>

//                 <div className="idea-content">
//                   <h3 className="idea-title">
//                     <i className='bx bx-bulb'></i>
//                     {idea.ideaName}
//                   </h3>
//                   <p className="idea-description">{idea.description}</p>
                  
//                   <div className="idea-meta">
//                     <span className="meta-date">
//                       <i className='bx bx-calendar'></i>
//                       {idea.submittedDate}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="reviewed-status">
//                   <i className={`bx ${idea.status === 'Approved' ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
//                   <span>This idea has been {idea.status.toLowerCase()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {pendingIdeas.length === 0 && reviewedIdeas.length === 0 && (
//         <div className="empty-state">
//           <i className='bx bx-bulb'></i>
//           <p>No project ideas submitted yet</p>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="confirmation-overlay">
//           <div className="confirmation-modal">
//             <div className="modal-icon">
//               <i className={`bx ${pendingAction === 'Approved' ? 'bx-check-circle' : 'bx-x-circle'}`}></i>
//             </div>
//             <h3>Confirm {pendingAction}</h3>
//             <p>
//               Are you sure you want to {pendingAction.toLowerCase()} the project idea 
//               <strong> "{selectedIdea?.ideaName}"</strong> from <strong>{selectedIdea?.teamName}</strong>?
//             </p>
//             <div className="modal-actions">
//               <button className="cancel-btn" onClick={cancelAction}>
//                 Cancel
//               </button>
//               <button 
//                 className={pendingAction === 'Approved' ? 'confirm-approve-btn' : 'confirm-reject-btn'}
//                 onClick={confirmAction}
//               >
//                 Yes, {pendingAction}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IdeaReview;
import React, { useState } from 'react';
import '../styles/ideaReview.css';

const IdeaReview = ({ onBack }) => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      teamName: 'Team Alpha',
      ideaName: 'AI Chatbot System',
      description: 'An intelligent chatbot system for student assistance using natural language processing and machine learning. The system will help students with queries, course information, and general guidance.',
      status: 'Pending',
      submittedDate: 'March 15, 2026'
    },
    {
      id: 2,
      teamName: 'Team Beta',
      ideaName: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart functionality, payment integration, and order tracking. Focused on providing seamless shopping experience.',
      status: 'Pending',
      submittedDate: 'March 16, 2026'
    },
    {
      id: 3,
      teamName: 'Team Gamma',
      ideaName: 'IoT Smart Home System',
      description: 'Internet of Things based smart home automation system with mobile app control. Features include lighting control, temperature monitoring, and security alerts.',
      status: 'Pending',
      submittedDate: 'March 17, 2026'
    },
    {
      id: 4,
      teamName: 'Team Delta',
      ideaName: 'Blockchain Voting System',
      description: 'Secure and transparent voting system using blockchain technology. Ensures vote integrity, anonymity, and prevents tampering with immutable ledger.',
      status: 'Pending',
      submittedDate: 'March 18, 2026'
    }
  ]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

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

  const confirmAction = () => {
    setIdeas(ideas.map(idea =>
      idea.id === selectedIdea.id
        ? { ...idea, status: pendingAction }
        : idea
    ));
    setShowConfirmation(false);
    setSelectedIdea(null);
    setPendingAction(null);
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setSelectedIdea(null);
    setPendingAction(null);
  };

  const pendingIdeas = ideas.filter(idea => idea.status === 'Pending');
  const reviewedIdeas = ideas.filter(idea => idea.status !== 'Pending');

  const getCardClass = (status) => {
    if (status === 'Approved') return 'idea-card approved-card';
    if (status === 'Rejected') return 'idea-card rejected-card';
    return 'idea-card pending-card';
  };

  return (
    <div className="idea-review-container">
      <div className="review-header">
        <h2>Idea Review</h2>
        <p>Review and approve project ideas submitted by student teams</p>
      </div>

      {/* Pending Ideas */}
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
                    <div className="idea-meta">
                      <span className="meta-date">
                        <i className="bx bx-calendar"></i>
                        {idea.submittedDate}
                      </span>
                    </div>
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

      {/* Reviewed Ideas */}
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
                    <div className="idea-meta">
                      <span className="meta-date">
                        <i className="bx bx-calendar"></i>
                        {idea.submittedDate}
                      </span>
                    </div>
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

      {/* Empty State */}
      {ideas.length === 0 && (
        <div className="empty-state">
          <i className="bx bx-bulb"></i>
          <p>No ideas submitted yet</p>
        </div>
      )}

      {/* Confirmation Modal */}
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
              <button className="cancel-btn" onClick={cancelAction}>Cancel</button>
              {pendingAction === 'Approved' ? (
                <button className="confirm-approve-btn" onClick={confirmAction}>Yes, Approve</button>
              ) : (
                <button className="confirm-reject-btn" onClick={confirmAction}>Yes, Reject</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaReview;
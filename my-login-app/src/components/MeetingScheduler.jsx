// import React, { useState, useEffect } from 'react';

// const MeetingScheduler = ({ userRole, username, onNavigate }) => {
//   const [activeTab, setActiveTab] = useState('request');
//   const [theme, setTheme] = useState('default');
  
//   // Form state for Meeting Request
//   const [formData, setFormData] = useState({
//     studentId: username || '',
//     guideId: '',
//     topic: '',
//     meetingMode: ''
//   });
  
//   // Dummy data for guides
//   const availableGuides = [
//     { id: 'G001', name: 'Dr. Rajesh Kumar' },
//     { id: 'G002', name: 'Prof. Anjali Sharma' },
//     { id: 'G003', name: 'Dr. Vikram Singh' },
//     { id: 'G004', name: 'Prof. Priya Mehta' },
//     { id: 'G005', name: 'Dr. Amit Patel' }
//   ];
  
//   // Dummy approved meetings
//   const approvedMeetings = [
//     {
//       id: 1,
//       topic: 'Project Review Discussion',
//       scheduledTime: '2026-02-12 10:00 AM',
//       meetingMode: 'ONLINE',
//       status: 'APPROVED',
//       meetingLink: 'https://meet.google.com/abc-defg-hij'
//     },
//     {
//       id: 2,
//       topic: 'Mid-term Presentation',
//       scheduledTime: '2026-02-15 02:00 PM',
//       meetingMode: 'OFFLINE',
//       status: 'PENDING',
//       meetingLink: null
//     },
//     {
//       id: 3,
//       topic: 'Weekly Progress Update',
//       scheduledTime: '2026-02-08 11:00 AM',
//       meetingMode: 'ONLINE',
//       status: 'COMPLETED',
//       meetingLink: 'https://meet.google.com/xyz-uvwx-rst'
//     },
//     {
//       id: 4,
//       topic: 'Requirements Discussion',
//       scheduledTime: '2026-02-10 03:30 PM',
//       meetingMode: 'OFFLINE',
//       status: 'REJECTED',
//       meetingLink: null
//     }
//   ];
  
//   // Dummy meeting history
//   const meetingHistory = [
//     {
//       id: 1,
//       topic: 'Project Review Discussion',
//       guideId: 'G001',
//       guideName: 'Dr. Rajesh Kumar',
//       status: 'APPROVED',
//       scheduledTime: '2026-02-12 10:00 AM'
//     },
//     {
//       id: 2,
//       topic: 'Mid-term Presentation',
//       guideId: 'G002',
//       guideName: 'Prof. Anjali Sharma',
//       status: 'PENDING',
//       scheduledTime: '2026-02-15 02:00 PM'
//     },
//     {
//       id: 3,
//       topic: 'Weekly Progress Update',
//       guideId: 'G001',
//       guideName: 'Dr. Rajesh Kumar',
//       status: 'COMPLETED',
//       scheduledTime: '2026-02-08 11:00 AM'
//     },
//     {
//       id: 4,
//       topic: 'Requirements Discussion',
//       guideId: 'G003',
//       guideName: 'Dr. Vikram Singh',
//       status: 'REJECTED',
//       scheduledTime: '2026-02-10 03:30 PM'
//     },
//     {
//       id: 5,
//       topic: 'Initial Project Discussion',
//       guideId: 'G004',
//       guideName: 'Prof. Priya Mehta',
//       status: 'COMPLETED',
//       scheduledTime: '2026-01-20 09:00 AM'
//     }
//   ];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'default';
//     setTheme(savedTheme);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Meeting Request Submitted:', formData);
//     // TODO: API call to submit meeting request
//     alert('Meeting Request Sent Successfully!');
//     setFormData({
//       studentId: username || '',
//       guideId: '',
//       topic: '',
//       meetingMode: ''
//     });
//   };

//   const handleJoinMeeting = (meetingLink) => {
//     window.open(meetingLink, '_blank');
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'APPROVED': return '#1abc9c';
//       case 'PENDING': return '#f39c12';
//       case 'REJECTED': return '#e74c3c';
//       case 'COMPLETED': return '#95a5a6';
//       default: return '#34495e';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'APPROVED': return 'bx-check-circle';
//       case 'PENDING': return 'bx-time-five';
//       case 'REJECTED': return 'bx-x-circle';
//       case 'COMPLETED': return 'bx-check-double';
//       default: return 'bx-help-circle';
//     }
//   };

//   const renderMeetingRequest = () => (
//     <div className="screen-container">
//       <div className="form-card">
//         <h3 className="form-title">
//           <i className='bx bx-calendar-plus'></i>
//           Request New Meeting
//         </h3>
//         <form onSubmit={handleSubmit} className="meeting-form">
//           <div className="form-group">
//             <label htmlFor="studentId">
//               <i className='bx bx-user'></i>
//               Student ID
//             </label>
//             <input
//               type="text"
//               id="studentId"
//               name="studentId"
//               value={formData.studentId}
//               readOnly
//               className="readonly-input"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="guideId">
//               <i className='bx bx-user-check'></i>
//               Select Guide <span className="required">*</span>
//             </label>
//             <select
//               id="guideId"
//               name="guideId"
//               value={formData.guideId}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">-- Select Guide --</option>
//               {availableGuides.map(guide => (
//                 <option key={guide.id} value={guide.id}>
//                   {guide.id} - {guide.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="topic">
//               <i className='bx bx-message-detail'></i>
//               Topic <span className="required">*</span>
//             </label>
//             <input
//               type="text"
//               id="topic"
//               name="topic"
//               value={formData.topic}
//               onChange={handleInputChange}
//               placeholder="Enter meeting topic"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="meetingMode">
//               <i className='bx bx-video'></i>
//               Meeting Mode <span className="required">*</span>
//             </label>
//             <select
//               id="meetingMode"
//               name="meetingMode"
//               value={formData.meetingMode}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">-- Select Mode --</option>
//               <option value="ONLINE">ONLINE</option>
//               <option value="OFFLINE">OFFLINE</option>
//             </select>
//           </div>

//           <button type="submit" className="submit-btn">
//             <i className='bx bx-send'></i>
//             Request Meeting
//           </button>
//         </form>
//       </div>
//     </div>
//   );

//   const renderApprovedMeetings = () => (
//     <div className="screen-container">
//       <div className="meetings-grid">
//         {approvedMeetings.map(meeting => (
//           <div key={meeting.id} className="meeting-card">
//             <div className="meeting-header">
//               <h4 className="meeting-topic">{meeting.topic}</h4>
//               <div 
//                 className="status-badge"
//                 style={{ backgroundColor: getStatusColor(meeting.status) }}
//               >
//                 <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
//                 {meeting.status}
//               </div>
//             </div>

//             <div className="meeting-details">
//               <div className="detail-item">
//                 <i className='bx bx-time'></i>
//                 <span>{meeting.scheduledTime}</span>
//               </div>
//               <div className="detail-item">
//                 <i className='bx bx-video'></i>
//                 <span>{meeting.meetingMode}</span>
//               </div>
//             </div>

//             <div className="meeting-actions">
//               {meeting.status === 'APPROVED' && (
//                 <button 
//                   className="join-btn"
//                   onClick={() => handleJoinMeeting(meeting.meetingLink)}
//                 >
//                   <i className='bx bx-video-plus'></i>
//                   Join Meeting
//                 </button>
//               )}
//               {meeting.status === 'PENDING' && (
//                 <div className="pending-message">
//                   <i className='bx bx-time-five'></i>
//                   Waiting for Approval
//                 </div>
//               )}
//               {meeting.status === 'REJECTED' && (
//                 <div className="rejected-message">
//                   <i className='bx bx-x-circle'></i>
//                   Request Rejected
//                 </div>
//               )}
//               {meeting.status === 'COMPLETED' && (
//                 <div className="completed-message">
//                   <i className='bx bx-check-double'></i>
//                   Meeting Completed
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderMeetingHistory = () => (
//     <div className="screen-container">
//       <div className="history-table-container">
//         <table className="history-table">
//           <thead>
//             <tr>
//               <th><i className='bx bx-message-detail'></i> Topic</th>
//               <th><i className='bx bx-user-check'></i> Guide</th>
//               <th><i className='bx bx-time'></i> Scheduled Time</th>
//               <th><i className='bx bx-info-circle'></i> Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {meetingHistory.map(meeting => (
//               <tr key={meeting.id}>
//                 <td className="topic-cell">{meeting.topic}</td>
//                 <td className="guide-cell">
//                   <div className="guide-info">
//                     <span className="guide-id">{meeting.guideId}</span>
//                     <span className="guide-name">{meeting.guideName}</span>
//                   </div>
//                 </td>
//                 <td className="time-cell">{meeting.scheduledTime}</td>
//                 <td className="status-cell">
//                   <div 
//                     className="status-badge-small"
//                     style={{ backgroundColor: getStatusColor(meeting.status) }}
//                   >
//                     <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
//                     {meeting.status}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
//       <div className="meeting-scheduler-page">
//         {/* Custom Header */}
//         <header className="custom-header">
//           <div className="header-content">
//             <h1 className="page-title">Schedule Meeting</h1>
//             <nav className="tab-navigation">
//               <button 
//                 className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('request')}
//               >
//                 <i className='bx bx-calendar-plus'></i>
//                 <span>Meeting Request</span>
//               </button>
//               <button 
//                 className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('approved')}
//               >
//                 <i className='bx bx-check-circle'></i>
//                 <span>Approved Meetings</span>
//               </button>
//               <button 
//                 className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
//                 onClick={() => setActiveTab('history')}
//               >
//                 <i className='bx bx-history'></i>
//                 <span>Meeting History</span>
//               </button>
//             </nav>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="content-area">
//           {activeTab === 'request' && renderMeetingRequest()}
//           {activeTab === 'approved' && renderApprovedMeetings()}
//           {activeTab === 'history' && renderMeetingHistory()}
//         </main>

//         {/* Close Button */}
//         <button className="close-btn" onClick={() => onNavigate && onNavigate('dashboard')}>
//           <i className='bx bx-x'></i>
//         </button>
//       </div>

//       <style jsx>{`
//         .meeting-scheduler-page {
//           min-height: 100vh;
//           background: var(--bg-primary);
//           position: relative;
//         }

//         /* Custom Header */
//         .custom-header {
//           background: linear-gradient(135deg, var(--accent-color), #34495e);
//           padding: 2rem 1rem 1rem;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//         }

//         .header-content {
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .page-title {
//           text-align: center;
//           font-size: 2.5rem;
//           font-weight: 700;
//           color: white;
//           margin-bottom: 2rem;
//           text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//         }

//         .tab-navigation {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .tab-btn {
//           padding: 1rem 2rem;
//           background: rgba(255, 255, 255, 0.1);
//           border: 2px solid transparent;
//           border-radius: 12px;
//           color: rgba(255, 255, 255, 0.8);
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           backdrop-filter: blur(10px);
//         }

//         .tab-btn i {
//           font-size: 1.5rem;
//         }

//         .tab-btn:hover {
//           background: rgba(255, 255, 255, 0.2);
//           border-color: rgba(255, 255, 255, 0.3);
//           color: white;
//         }

//         .tab-btn.active {
//           background: white;
//           color: var(--accent-color);
//           border-color: white;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//         }

//         /* Content Area */
//         .content-area {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 3rem 2rem;
//           min-height: calc(100vh - 200px);
//         }

//         .screen-container {
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         /* Meeting Request Form */
//         .form-card {
//           background: var(--card-bg);
//           border-radius: 16px;
//           padding: 2.5rem;
//           max-width: 600px;
//           margin: 0 auto;
//           box-shadow: var(--shadow);
//         }

//         .form-title {
//           font-size: 1.75rem;
//           font-weight: 600;
//           color: var(--text-primary);
//           margin-bottom: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .form-title i {
//           font-size: 2rem;
//           color: var(--accent-color);
//         }

//         .meeting-form {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.6rem;
//         }

//         .form-group label {
//           font-size: 1rem;
//           font-weight: 600;
//           color: var(--text-primary);
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .form-group label i {
//           font-size: 1.25rem;
//           color: var(--accent-color);
//         }

//         .required {
//           color: #e74c3c;
//         }

//         .form-group input,
//         .form-group select {
//           padding: 0.9rem 1.1rem;
//           border: 2px solid rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
//           font-size: 1rem;
//           background: var(--bg-secondary);
//           color: var(--text-primary);
//           transition: all 0.3s ease;
//         }

//         .form-group input:focus,
//         .form-group select:focus {
//           outline: none;
//           border-color: var(--accent-color);
//           box-shadow: 0 0 0 3px rgba(52, 73, 94, 0.1);
//         }

//         .readonly-input {
//           background: rgba(0, 0, 0, 0.05) !important;
//           cursor: not-allowed;
//         }

//         .submit-btn {
//           padding: 1.1rem;
//           background: linear-gradient(135deg, var(--accent-color), #34495e);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.75rem;
//           margin-top: 1rem;
//         }

//         .submit-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
//         }

//         .submit-btn i {
//           font-size: 1.5rem;
//         }

//         /* Approved Meetings Grid */
//         .meetings-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//           gap: 1.5rem;
//         }

//         .meeting-card {
//           background: var(--card-bg);
//           border-radius: 12px;
//           padding: 1.75rem;
//           box-shadow: var(--shadow);
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//         }

//         .meeting-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
//           border-color: var(--accent-color);
//         }

//         .meeting-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 1rem;
//           margin-bottom: 1.25rem;
//           padding-bottom: 1rem;
//           border-bottom: 2px solid rgba(0, 0, 0, 0.05);
//         }

//         .meeting-topic {
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: var(--text-primary);
//           flex: 1;
//         }

//         .status-badge {
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           color: white;
//           font-size: 0.85rem;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           white-space: nowrap;
//         }

//         .status-badge i {
//           font-size: 1.1rem;
//         }

//         .meeting-details {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//           margin-bottom: 1.25rem;
//         }

//         .detail-item {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           color: var(--text-primary);
//         }

//         .detail-item i {
//           font-size: 1.25rem;
//           color: var(--accent-color);
//         }

//         .meeting-actions {
//           margin-top: 1.25rem;
//         }

//         .join-btn {
//           width: 100%;
//           padding: 0.9rem;
//           background: linear-gradient(135deg, #1abc9c, #16a085);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.75rem;
//         }

//         .join-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
//         }

//         .join-btn i {
//           font-size: 1.25rem;
//         }

//         .pending-message,
//         .rejected-message,
//         .completed-message {
//           padding: 0.9rem;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.75rem;
//           font-weight: 600;
//         }

//         .pending-message {
//           background: rgba(243, 156, 18, 0.1);
//           color: #f39c12;
//           border: 2px solid #f39c12;
//         }

//         .rejected-message {
//           background: rgba(231, 76, 60, 0.1);
//           color: #e74c3c;
//           border: 2px solid #e74c3c;
//         }

//         .completed-message {
//           background: rgba(149, 165, 166, 0.1);
//           color: #95a5a6;
//           border: 2px solid #95a5a6;
//         }

//         /* Meeting History Table */
//         .history-table-container {
//           background: var(--card-bg);
//           border-radius: 12px;
//           padding: 1.5rem;
//           box-shadow: var(--shadow);
//           overflow-x: auto;
//         }

//         .history-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .history-table thead {
//           background: var(--accent-color);
//           color: white;
//         }

//         .history-table th {
//           padding: 1rem;
//           text-align: left;
//           font-weight: 600;
//           font-size: 0.95rem;
//           white-space: nowrap;
//         }

//         .history-table th i {
//           margin-right: 0.5rem;
//           font-size: 1.1rem;
//         }

//         .history-table tbody tr {
//           border-bottom: 1px solid rgba(0, 0, 0, 0.05);
//           transition: background 0.2s ease;
//         }

//         .history-table tbody tr:hover {
//           background: rgba(0, 0, 0, 0.02);
//         }

//         .history-table td {
//           padding: 1rem;
//           color: var(--text-primary);
//         }

//         .topic-cell {
//           font-weight: 600;
//           color: var(--text-primary);
//         }

//         .guide-cell {
//           min-width: 200px;
//         }

//         .guide-info {
//           display: flex;
//           flex-direction: column;
//           gap: 0.25rem;
//         }

//         .guide-id {
//           font-weight: 600;
//           color: var(--accent-color);
//           font-size: 0.9rem;
//         }

//         .guide-name {
//           font-size: 0.85rem;
//           color: var(--text-secondary);
//         }

//         .time-cell {
//           white-space: nowrap;
//         }

//         .status-badge-small {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.4rem 0.9rem;
//           border-radius: 20px;
//           color: white;
//           font-size: 0.85rem;
//           font-weight: 600;
//           white-space: nowrap;
//         }

//         .status-badge-small i {
//           font-size: 1rem;
//         }

//         /* Close Button */
//         .close-btn {
//           position: fixed;
//           top: 1.5rem;
//           right: 1.5rem;
//           width: 50px;
//           height: 50px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.2);
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           color: white;
//           font-size: 1.75rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//         }

//         .close-btn:hover {
//           background: rgba(255, 255, 255, 0.3);
//           transform: rotate(90deg);
//         }

//         /* Responsive Design */
//         @media (max-width: 768px) {
//           .custom-header {
//             padding: 1.5rem 1rem 1rem;
//           }

//           .page-title {
//             font-size: 2rem;
//             margin-bottom: 1.5rem;
//           }

//           .tab-navigation {
//             flex-direction: column;
//           }

//           .tab-btn {
//             width: 100%;
//             justify-content: center;
//           }

//           .content-area {
//             padding: 2rem 1rem;
//           }

//           .form-card {
//             padding: 1.75rem;
//           }

//           .meetings-grid {
//             grid-template-columns: 1fr;
//           }

//           .meeting-header {
//             flex-direction: column;
//           }

//           .status-badge {
//             align-self: flex-start;
//           }

//           .history-table-container {
//             padding: 1rem;
//           }

//           .history-table {
//             font-size: 0.9rem;
//           }

//           .history-table th,
//           .history-table td {
//             padding: 0.75rem 0.5rem;
//           }

//           .close-btn {
//             width: 45px;
//             height: 45px;
//             top: 1rem;
//             right: 1rem;
//           }
//         }

//         @media (max-width: 480px) {
//           .page-title {
//             font-size: 1.75rem;
//           }

//           .tab-btn {
//             padding: 0.9rem 1.5rem;
//             font-size: 0.95rem;
//           }

//           .form-card {
//             padding: 1.5rem;
//           }

//           .history-table {
//             font-size: 0.85rem;
//           }
//         }

//         /* Theme-specific adjustments for Light theme */
//         :root[data-theme="light"] .custom-header {
//           background: linear-gradient(135deg, #34495e, #2c3e50);
//         }

//         :root[data-theme="light"] .meeting-card,
//         :root[data-theme="light"] .form-card,
//         :root[data-theme="light"] .history-table-container {
//           border: 1px solid rgba(0, 0, 0, 0.08);
//         }

//         :root[data-theme="light"] .form-group input,
//         :root[data-theme="light"] .form-group select {
//           border-color: rgba(0, 0, 0, 0.15);
//         }

//         :root[data-theme="light"] .history-table tbody tr:hover {
//           background: rgba(52, 73, 94, 0.05);
//         }
//       `}</style>
//     </>
//   );
// };

// export default MeetingScheduler;

import React, { useState, useEffect } from 'react';

const MeetingScheduler = ({ userRole, username, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('request');
  const [theme, setTheme] = useState('default');
  
  // Form state for Meeting Request
  const [formData, setFormData] = useState({
    studentId: username || '',
    guideId: '',
    topic: '',
    meetingMode: ''
  });
  
  // Dummy data for guides
  const availableGuides = [
    { id: 'G001', name: 'Dr. Rajesh Kumar' },
    { id: 'G002', name: 'Prof. Anjali Sharma' },
    { id: 'G003', name: 'Dr. Vikram Singh' },
    { id: 'G004', name: 'Prof. Priya Mehta' },
    { id: 'G005', name: 'Dr. Amit Patel' }
  ];
  
  // Dummy approved meetings
  const approvedMeetings = [
    {
      id: 1,
      topic: 'Project Review Discussion',
      scheduledTime: '2026-02-12 10:00 AM',
      meetingMode: 'ONLINE',
      status: 'APPROVED',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      topic: 'Mid-term Presentation',
      scheduledTime: '2026-02-15 02:00 PM',
      meetingMode: 'OFFLINE',
      status: 'PENDING',
      meetingLink: null
    },
    {
      id: 3,
      topic: 'Weekly Progress Update',
      scheduledTime: '2026-02-08 11:00 AM',
      meetingMode: 'ONLINE',
      status: 'COMPLETED',
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst'
    },
    {
      id: 4,
      topic: 'Requirements Discussion',
      scheduledTime: '2026-02-10 03:30 PM',
      meetingMode: 'OFFLINE',
      status: 'REJECTED',
      meetingLink: null
    }
  ];
  
  // Dummy meeting history
  const meetingHistory = [
    {
      id: 1,
      topic: 'Project Review Discussion',
      guideId: 'G001',
      guideName: 'Dr. Rajesh Kumar',
      status: 'APPROVED',
      scheduledTime: '2026-02-12 10:00 AM'
    },
    {
      id: 2,
      topic: 'Mid-term Presentation',
      guideId: 'G002',
      guideName: 'Prof. Anjali Sharma',
      status: 'PENDING',
      scheduledTime: '2026-02-15 02:00 PM'
    },
    {
      id: 3,
      topic: 'Weekly Progress Update',
      guideId: 'G001',
      guideName: 'Dr. Rajesh Kumar',
      status: 'COMPLETED',
      scheduledTime: '2026-02-08 11:00 AM'
    },
    {
      id: 4,
      topic: 'Requirements Discussion',
      guideId: 'G003',
      guideName: 'Dr. Vikram Singh',
      status: 'REJECTED',
      scheduledTime: '2026-02-10 03:30 PM'
    },
    {
      id: 5,
      topic: 'Initial Project Discussion',
      guideId: 'G004',
      guideName: 'Prof. Priya Mehta',
      status: 'COMPLETED',
      scheduledTime: '2026-01-20 09:00 AM'
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Meeting Request Submitted:', formData);
    // TODO: API call to submit meeting request
    alert('Meeting Request Sent Successfully!');
    setFormData({
      studentId: username || '',
      guideId: '',
      topic: '',
      meetingMode: ''
    });
  };

  const handleJoinMeeting = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'APPROVED': return '#1abc9c';
      case 'PENDING': return '#f39c12';
      case 'REJECTED': return '#e74c3c';
      case 'COMPLETED': return '#95a5a6';
      default: return '#34495e';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'APPROVED': return 'bx-check-circle';
      case 'PENDING': return 'bx-time-five';
      case 'REJECTED': return 'bx-x-circle';
      case 'COMPLETED': return 'bx-check-double';
      default: return 'bx-help-circle';
    }
  };

  const renderMeetingRequest = () => (
    <div className="screen-container">
      <div className="form-card">
        <div className="form-header">
          <div className="form-header-icon">
            <i className='bx bx-calendar-plus'></i>
          </div>
          <div className="form-header-text">
            <h3 className="form-title">Request New Meeting</h3>
            <p className="form-subtitle">Schedule a meeting with your guide</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="meeting-form">
          <div className="form-group">
            <label htmlFor="studentId">
              <i className='bx bx-user'></i>
              <span>Student ID</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                readOnly
                className="readonly-input"
              />
              <div className="input-icon">
                <i className='bx bx-lock-alt'></i>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guideId">
              <i className='bx bx-user-check'></i>
              <span>Select Guide</span>
              <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="guideId"
                name="guideId"
                value={formData.guideId}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Choose your guide --</option>
                {availableGuides.map(guide => (
                  <option key={guide.id} value={guide.id}>
                    {guide.id} - {guide.name}
                  </option>
                ))}
              </select>
              <div className="select-icon">
                <i className='bx bx-chevron-down'></i>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="topic">
              <i className='bx bx-message-detail'></i>
              <span>Meeting Topic</span>
              <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g., Project Progress Discussion"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meetingMode">
              <i className='bx bx-video'></i>
              <span>Meeting Mode</span>
              <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="meetingMode"
                name="meetingMode"
                value={formData.meetingMode}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select mode --</option>
                <option value="ONLINE">🌐 Online Meeting</option>
                <option value="OFFLINE">🏢 In-Person Meeting</option>
              </select>
              <div className="select-icon">
                <i className='bx bx-chevron-down'></i>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            <i className='bx bx-send'></i>
            <span>Request Meeting</span>
            <div className="btn-shine"></div>
          </button>
        </form>
      </div>
    </div>
  );

  const renderApprovedMeetings = () => (
    <div className="screen-container">
      <div className="meetings-grid">
        {approvedMeetings.map(meeting => (
          <div key={meeting.id} className="meeting-card">
            <div className="meeting-header">
              <h4 className="meeting-topic">{meeting.topic}</h4>
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(meeting.status) }}
              >
                <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
                {meeting.status}
              </div>
            </div>

            <div className="meeting-details">
              <div className="detail-item">
                <i className='bx bx-time'></i>
                <span>{meeting.scheduledTime}</span>
              </div>
              <div className="detail-item">
                <i className='bx bx-video'></i>
                <span>{meeting.meetingMode}</span>
              </div>
            </div>

            <div className="meeting-actions">
              {meeting.status === 'APPROVED' && (
                <button 
                  className="join-btn"
                  onClick={() => handleJoinMeeting(meeting.meetingLink)}
                >
                  <i className='bx bx-video-plus'></i>
                  Join Meeting
                </button>
              )}
              {meeting.status === 'PENDING' && (
                <div className="pending-message">
                  <i className='bx bx-time-five'></i>
                  Waiting for Approval
                </div>
              )}
              {meeting.status === 'REJECTED' && (
                <div className="rejected-message">
                  <i className='bx bx-x-circle'></i>
                  Request Rejected
                </div>
              )}
              {meeting.status === 'COMPLETED' && (
                <div className="completed-message">
                  <i className='bx bx-check-double'></i>
                  Meeting Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMeetingHistory = () => (
    <div className="screen-container">
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th><i className='bx bx-message-detail'></i> Topic</th>
              <th><i className='bx bx-user-check'></i> Guide</th>
              <th><i className='bx bx-time'></i> Scheduled Time</th>
              <th><i className='bx bx-info-circle'></i> Status</th>
            </tr>
          </thead>
          <tbody>
            {meetingHistory.map(meeting => (
              <tr key={meeting.id}>
                <td className="topic-cell">{meeting.topic}</td>
                <td className="guide-cell">
                  <div className="guide-info">
                    <span className="guide-id">{meeting.guideId}</span>
                    <span className="guide-name">{meeting.guideName}</span>
                  </div>
                </td>
                <td className="time-cell">{meeting.scheduledTime}</td>
                <td className="status-cell">
                  <div 
                    className="status-badge-small"
                    style={{ backgroundColor: getStatusColor(meeting.status) }}
                  >
                    <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
                    {meeting.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="meeting-scheduler-page">
        {/* Custom Header */}
        <header className="custom-header">
          <div className="header-content">
            <h1 className="page-title">Schedule Meeting</h1>
            <nav className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
                onClick={() => setActiveTab('request')}
              >
                <i className='bx bx-calendar-plus'></i>
                <span>Meeting Request</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                <i className='bx bx-check-circle'></i>
                <span>Approved Meetings</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <i className='bx bx-history'></i>
                <span>Meeting History</span>
              </button>
            </nav>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          {activeTab === 'request' && renderMeetingRequest()}
          {activeTab === 'approved' && renderApprovedMeetings()}
          {activeTab === 'history' && renderMeetingHistory()}
        </main>

        {/* Close Button */}
        <button className="close-btn" onClick={() => onNavigate && onNavigate('dashboard')}>
          <i className='bx bx-x'></i>
        </button>
      </div>

      <style jsx>{`
        /* Enhanced styling with improved visual appeal */
        
        .meeting-scheduler-page {
          min-height: 100vh;
          background: var(--bg-primary);
          position: relative;
        }

        /* Light theme subtle background enhancement */
        :root[data-theme="light"] .meeting-scheduler-page {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        /* Custom Header */
        .custom-header {
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          padding: 2rem 1rem 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }

        .custom-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent 70%);
          pointer-events: none;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .page-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 2rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: -0.5px;
        }

        .tab-navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid transparent;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .tab-btn i {
          font-size: 1.5rem;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-2px);
        }

        .tab-btn.active {
          background: white;
          color: var(--accent-color);
          border-color: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }

        /* Content Area */
        .content-area {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          min-height: calc(100vh - 200px);
        }

        .screen-container {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Enhanced Meeting Request Form */
        .form-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 0;
          max-width: 650px;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        :root[data-theme="light"] .form-card {
          background: #ffffff;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(52, 73, 94, 0.08);
        }

        .form-header {
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .form-header::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%);
        }

        .form-header-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          flex-shrink: 0;
        }

        .form-header-icon i {
          font-size: 2rem;
          color: white;
        }

        .form-header-text {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .form-subtitle {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .meeting-form {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-group label {
          font-size: 0.95rem;
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

        .form-group label span:first-of-type {
          flex: 1;
        }

        .required {
          color: #e74c3c;
          font-weight: 700;
        }

        .input-wrapper,
        .select-wrapper {
          position: relative;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid rgba(52, 73, 94, 0.15);
          border-radius: 12px;
          font-size: 1rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: all 0.3s ease;
          outline: none;
        }

        :root[data-theme="light"] .form-group input,
        :root[data-theme="light"] .form-group select {
          background: #f8f9fa;
          border-color: rgba(52, 73, 94, 0.12);
        }

        .form-group input:hover,
        .form-group select:hover {
          border-color: var(--accent-color);
          background: var(--card-bg);
        }

        :root[data-theme="light"] .form-group input:hover,
        :root[data-theme="light"] .form-group select:hover {
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 4px rgba(52, 73, 94, 0.1);
          background: var(--card-bg);
        }

        :root[data-theme="light"] .form-group input:focus,
        :root[data-theme="light"] .form-group select:focus {
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(52, 73, 94, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .readonly-input {
          background: rgba(149, 165, 166, 0.1) !important;
          cursor: not-allowed;
          color: var(--text-secondary) !important;
        }

        .input-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          font-size: 1.25rem;
          pointer-events: none;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          appearance: none;
          padding-right: 3rem;
        }

        .select-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--accent-color);
          font-size: 1.5rem;
          pointer-events: none;
        }

        .submit-btn {
          padding: 1.25rem;
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(52, 73, 94, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(52, 73, 94, 0.4);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .submit-btn i {
          font-size: 1.5rem;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover .btn-shine {
          left: 100%;
        }

        /* Enhanced Meeting Cards */
        .meetings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .meeting-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        :root[data-theme="light"] .meeting-card {
          background: #ffffff;
          border-color: rgba(52, 73, 94, 0.08);
        }

        .meeting-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          border-color: var(--accent-color);
        }

        .meeting-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
        }

        .meeting-topic {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .status-badge i {
          font-size: 1.1rem;
        }

        .meeting-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-primary);
          padding: 0.5rem;
          background: rgba(52, 73, 94, 0.03);
          border-radius: 8px;
        }

        :root[data-theme="light"] .detail-item {
          background: #f8f9fa;
        }

        .detail-item i {
          font-size: 1.25rem;
          color: var(--accent-color);
        }

        .meeting-actions {
          margin-top: 1.25rem;
        }

        .join-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #1abc9c, #16a085);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
        }

        .join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(26, 188, 156, 0.4);
        }

        .join-btn i {
          font-size: 1.25rem;
        }

        .pending-message,
        .rejected-message,
        .completed-message {
          padding: 1rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-weight: 600;
        }

        .pending-message {
          background: rgba(243, 156, 18, 0.12);
          color: #f39c12;
          border: 2px solid rgba(243, 156, 18, 0.3);
        }

        .rejected-message {
          background: rgba(231, 76, 60, 0.12);
          color: #e74c3c;
          border: 2px solid rgba(231, 76, 60, 0.3);
        }

        .completed-message {
          background: rgba(149, 165, 166, 0.12);
          color: #95a5a6;
          border: 2px solid rgba(149, 165, 166, 0.3);
        }

        /* Enhanced Meeting History Table */
        .history-table-container {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow-x: auto;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        :root[data-theme="light"] .history-table-container {
          background: #ffffff;
          border-color: rgba(52, 73, 94, 0.08);
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .history-table thead {
          background: linear-gradient(135deg, var(--accent-color), #34495e);
          color: white;
        }

        .history-table th {
          padding: 1.1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .history-table th i {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }

        .history-table tbody tr {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: background 0.2s ease;
        }

        .history-table tbody tr:hover {
          background: rgba(52, 73, 94, 0.04);
        }

        :root[data-theme="light"] .history-table tbody tr:hover {
          background: #f8f9fa;
        }

        .history-table td {
          padding: 1.1rem;
          color: var(--text-primary);
        }

        .topic-cell {
          font-weight: 600;
          color: var(--text-primary);
        }

        .guide-cell {
          min-width: 200px;
        }

        .guide-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .guide-id {
          font-weight: 600;
          color: var(--accent-color);
          font-size: 0.9rem;
        }

        .guide-name {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .time-cell {
          white-space: nowrap;
        }

        .status-badge-small {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .status-badge-small i {
          font-size: 1rem;
        }

        /* Close Button */
        .close-btn {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 1.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .custom-header {
            padding: 1.5rem 1rem 1rem;
          }

          .page-title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .tab-btn {
            width: 100%;
            justify-content: center;
          }

          .content-area {
            padding: 2rem 1rem;
          }

          .form-card {
            border-radius: 16px;
          }

          .form-header {
            padding: 1.5rem;
          }

          .meeting-form {
            padding: 1.75rem;
          }

          .meetings-grid {
            grid-template-columns: 1fr;
          }

          .meeting-header {
            flex-direction: column;
          }

          .status-badge {
            align-self: flex-start;
          }

          .history-table-container {
            padding: 1rem;
          }

          .history-table {
            font-size: 0.9rem;
          }

          .history-table th,
          .history-table td {
            padding: 0.75rem 0.5rem;
          }

          .close-btn {
            width: 45px;
            height: 45px;
            top: 1rem;
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.75rem;
          }

          .tab-btn {
            padding: 0.9rem 1.5rem;
            font-size: 0.95rem;
          }

          .form-header {
            padding: 1.25rem;
          }

          .meeting-form {
            padding: 1.5rem;
          }

          .history-table {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default MeetingScheduler;
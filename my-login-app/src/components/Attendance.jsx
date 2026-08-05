// import React, { useState } from 'react';
// import PresentationAttendance from './PresentationAttendance';
// import MeetingAttendance from './MeetingAttendance';
// import '../styles/attendance.css';

// const Attendance = ({ onBack }) => {
//   const [activeTab, setActiveTab] = useState('presentation');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="attendance-page">
//       {/* Header Section - Same as Screenshot */}
//       <div className="attendance-header">
//         <h1 className="attendance-title">Attendance</h1>
        
//         {/* Tab Buttons */}
//         <div className="attendance-tabs">
//           <button
//             className={`tab-button ${activeTab === 'presentation' ? 'active' : ''}`}
//             onClick={() => handleTabClick('presentation')}
//           >
//             <i className='bx bx-slideshow'></i>
//             <span>Presentation</span>
//           </button>
          
//           <button
//             className={`tab-button ${activeTab === 'meeting' ? 'active' : ''}`}
//             onClick={() => handleTabClick('meeting')}
//           >
//             <i className='bx bx-calendar-event'></i>
//             <span>Meeting</span>
//           </button>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="attendance-content">
//         {activeTab === 'presentation' && (
//           <PresentationAttendance />
//         )}

//         {activeTab === 'meeting' && (
//           <div className="tab-content">
//             <div className="placeholder-content">
//               <i className='bx bx-calendar-event'></i>
//               <h3>Meeting Attendance</h3>
//               <p>Meeting attendance content will be displayed here</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Attendance;
import React, { useState } from 'react';
import PresentationAttendance from './PresentationAttendance';
import MeetingAttendance from './MeetingAttendance';
import '../styles/attendance.css';

const Attendance = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('presentation');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="attendance-page">
      {/* Close Button - Top Right */}
      <button className="attendance-close-btn" onClick={onClose}>
        <i className='bx bx-x'></i>
      </button>

      {/* Header Section */}
      <div className="attendance-header">
        <h1 className="attendance-title">Attendance</h1>
        
        {/* Tab Buttons */}
        <div className="attendance-tabs">
          <button
            className={`tab-button ${activeTab === 'presentation' ? 'active' : ''}`}
            onClick={() => handleTabClick('presentation')}
          >
            <i className='bx bx-slideshow'></i>
            <span>Presentation</span>
          </button>
          
          <button
            className={`tab-button ${activeTab === 'meeting' ? 'active' : ''}`}
            onClick={() => handleTabClick('meeting')}
          >
            <i className='bx bx-calendar-event'></i>
            <span>Meeting</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="attendance-content">
        {activeTab === 'presentation' && (
          <PresentationAttendance />
        )}

        {activeTab === 'meeting' && (
          <MeetingAttendance />
        )}
      </div>
    </div>
  );
};

export default Attendance;
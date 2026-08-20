import React, { useState } from 'react';
import PresentationAttendance from './PresentationAttendance';
import MeetingAttendance from './MeetingAttendance';
import '../styles/attendance.css';

const Attendance = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('presentation');

  return (
    <div className="attendance-page">
      <button className="attendance-close-btn" onClick={onClose}>
        <i className='bx bx-x'></i>
      </button>

      <div className="attendance-header">
        <h1 className="attendance-title">Attendance</h1>

        <div className="attendance-tabs">
          <button
            className={`tab-button ${activeTab === 'presentation' ? 'active' : ''}`}
            onClick={() => setActiveTab('presentation')}
          >
            <i className='bx bx-slideshow'></i>
            <span>Presentation</span>
          </button>

          <button
            className={`tab-button ${activeTab === 'meeting' ? 'active' : ''}`}
            onClick={() => setActiveTab('meeting')}
          >
            <i className='bx bx-calendar-event'></i>
            <span>Meeting</span>
          </button>
        </div>
      </div>

      <div className="attendance-content">
        {activeTab === 'presentation' && <PresentationAttendance />}
        {activeTab === 'meeting' && <MeetingAttendance />}
      </div>
    </div>
  );
};

export default Attendance;

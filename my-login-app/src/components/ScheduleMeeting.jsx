import React, { useState } from 'react';
import '../styles/scheduleMeeting.css';

const generateMeetingLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const rand = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.mentormate.app/${rand(3)}-${rand(4)}-${rand(3)}`;
};

const ScheduleMeeting = ({ onBack }) => {

  const [requests, setRequests] = useState([
    { id: 1, student: 'Arjun Verma',  enrollment: '0827CS211001', requestedDate: '2026-03-25', requestedTime: '10:00', topic: 'Project idea discussion',     status: 'pending'    },
    { id: 2, student: 'Sneha Reddy',  enrollment: '0827CS211002', requestedDate: '2026-03-26', requestedTime: '11:30', topic: 'Backend integration help',    status: 'pending'    },
    { id: 3, student: 'Rahul Joshi',  enrollment: '0827CS211003', requestedDate: '2026-03-27', requestedTime: '14:00', topic: 'Database setup review',       status: 'scheduled', scheduledDate: '2026-03-27', scheduledTime: '14:00', mode: 'Online',  link: 'https://meet.mentormate.app/abc-defg-hij' },
    { id: 4, student: 'Priya Desai',  enrollment: '0827CS211004', requestedDate: '2026-03-28', requestedTime: '15:30', topic: 'Milestone completion check',  status: 'pending'    },
    { id: 5, student: 'Karan Singh',  enrollment: '0827CS211005', requestedDate: '2026-03-29', requestedTime: '09:00', topic: 'Final presentation feedback', status: 'pending'    },
  ]);

  const todayStr = new Date().toISOString().split('T')[0];

  const [showModal, setShowModal]             = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form, setForm]                       = useState({ date: '', time: '', mode: '', link: '' });
  const [errors, setErrors]                   = useState({});
  const [successId, setSuccessId]             = useState(null);

  const pendingList   = requests.filter(r => r.status === 'pending');
  const scheduledList = requests.filter(r => r.status === 'scheduled');

  const openModal = (req) => {
    setSelectedRequest(req);
    setForm({ date: req.requestedDate, time: req.requestedTime, mode: '', link: '' });
    setErrors({});
    setSuccessId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setErrors({});
  };

  const handleChange = (field, value) => {
    if (field === 'mode') {
      const newLink = value === 'Online' ? generateMeetingLink() : '';
      setForm(prev => ({ ...prev, mode: value, link: newLink }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
    setErrors(prev => ({ ...prev, [field]: '', link: '' }));
  };

  const handleRegenerateLink = () => {
    setForm(prev => ({ ...prev, link: generateMeetingLink() }));
  };

  const validate = () => {
    const e = {};
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    if (!form.mode) e.mode = 'Please select a mode';
    return e;
  };

  const handleConfirm = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const meetingData = {
      studentId:    selectedRequest.id,
      student:      selectedRequest.student,
      selectedDate: form.date,
      selectedTime: form.time,
      meetingMode:  form.mode,
      meetingLink:  form.mode === 'Online' ? form.link : null,
    };
    console.log('Meeting scheduled:', meetingData);
    setRequests(prev => prev.map(r =>
      r.id === selectedRequest.id
        ? { ...r, status: 'scheduled', scheduledDate: form.date, scheduledTime: form.time, mode: form.mode, link: form.link }
        : r
    ));
    setSuccessId(selectedRequest.id);
    setTimeout(() => closeModal(), 1800);
  };

  return (
    <div className="sm-container">

      {/* Page Header */}
      <div className="sm-page-header">
        <div className="sm-page-header-left">
          <button className="sm-back-btn" onClick={onBack}>
            <i className="bx bx-arrow-back"></i>
            Back
          </button>
          <div>
            <h1 className="sm-page-title">
              <i className="bx bx-calendar-plus"></i>
              Schedule Meeting
            </h1>
            <p className="sm-page-sub">Review student requests and schedule meetings</p>
          </div>
        </div>
        <div className="sm-counters">
          <span className="sm-counter pending-counter">
            <i className="bx bx-time-five"></i>
            {pendingList.length} Pending
          </span>
          <span className="sm-counter scheduled-counter">
            <i className="bx bx-check-circle"></i>
            {scheduledList.length} Scheduled
          </span>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingList.length > 0 && (
        <div className="sm-section-card">
          <div className="sm-section-head">
            <i className="bx bx-time-five"></i>
            <h3>Pending Requests</h3>
          </div>
          <div className="sm-table-wrap">
            <table className="sm-table">
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '16%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '12%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Enrollment</th>
                  <th>Requested Date</th>
                  <th>Time</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map(req => (
                  <tr key={req.id}>
                    <td>
                      <div className="sm-student-cell">
                        <div className="sm-avatar">{req.student.charAt(0)}</div>
                        <span>{req.student}</span>
                      </div>
                    </td>
                    <td className="sm-mono">{req.enrollment}</td>
                    <td>{req.requestedDate}</td>
                    <td>{req.requestedTime}</td>
                    <td className="sm-topic">{req.topic}</td>
                    <td>
                      <button className="sm-approve-btn" onClick={() => openModal(req)}>
                        <i className="bx bx-check-circle"></i>
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Scheduled Meetings */}
      {scheduledList.length > 0 && (
        <div className="sm-section-card">
          <div className="sm-section-head">
            <i className="bx bx-calendar-check"></i>
            <h3>Scheduled Meetings</h3>
          </div>
          <div className="sm-table-wrap">
            <table className="sm-table">
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '14%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '27%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mode</th>
                  <th>Meeting Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {scheduledList.map(req => (
                  <tr key={req.id}>
                    <td>
                      <div className="sm-student-cell">
                        <div className="sm-avatar">{req.student.charAt(0)}</div>
                        <span>{req.student}</span>
                      </div>
                    </td>
                    <td>{req.scheduledDate}</td>
                    <td>{req.scheduledTime}</td>
                    <td>
                      <span className={`sm-mode-tag ${req.mode === 'Online' ? 'online' : 'offline'}`}>
                        <i className={`bx ${req.mode === 'Online' ? 'bx-wifi' : 'bx-buildings'}`}></i>
                        {req.mode}
                      </span>
                    </td>
                    <td>
                      {req.link ? (
                        <a href={req.link} target="_blank" rel="noreferrer" className="sm-join-link">
                          <i className="bx bx-link-external"></i>
                          Join Meeting
                        </a>
                      ) : (
                        <span className="sm-offline-tag">In-person</span>
                      )}
                    </td>
                    <td>
                      <span className="sm-scheduled-tag">
                        <i className="bx bx-check-circle"></i>
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty */}
      {requests.length === 0 && (
        <div className="sm-empty">
          <i className="bx bx-calendar-x"></i>
          <p>No meeting requests yet</p>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="sm-overlay" onClick={closeModal}>
          <div className="sm-modal" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="sm-modal-header">
              <div className="sm-modal-title-wrap">
                <div className="sm-modal-icon-box">
                  <i className="bx bx-calendar-plus"></i>
                </div>
                <div>
                  <h3>Schedule Meeting</h3>
                  <p>with <strong>{selectedRequest.student}</strong></p>
                </div>
              </div>
              <button className="sm-modal-close" onClick={closeModal}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            {/* Success State */}
            {successId === selectedRequest.id ? (
              <div className="sm-success-state">
                <div className="sm-success-icon">
                  <i className="bx bx-check-circle"></i>
                </div>
                <h4>Meeting Scheduled!</h4>
                <p>{form.date} at {form.time} · {form.mode}</p>
              </div>
            ) : (
              <div className="sm-modal-body">

                {/* Request Info Banner */}
                <div className="sm-request-info">
                  <div className="sm-request-info-item">
                    <i className="bx bx-user"></i>
                    <span>{selectedRequest.student}</span>
                  </div>
                  <div className="sm-request-info-item">
                    <i className="bx bx-message-dots"></i>
                    <span>{selectedRequest.topic}</span>
                  </div>
                </div>

                {/* Form */}
                <div className="sm-form">

                  {/* Date + Time */}
                  <div className="sm-form-row">
                    <div className="sm-field">
                      <label className="sm-label">
                        <i className="bx bx-calendar"></i>
                        Date <span className="sm-required">*</span>
                      </label>
                      <input
                        type="date"
                        className={`sm-input${errors.date ? ' sm-input-error' : ''}`}
                        value={form.date}
                        min={todayStr}
                        onChange={e => handleChange('date', e.target.value)}
                      />
                      {errors.date && (
                        <span className="sm-error-msg">
                          <i className="bx bx-error-circle"></i>{errors.date}
                        </span>
                      )}
                    </div>

                    <div className="sm-field">
                      <label className="sm-label">
                        <i className="bx bx-time"></i>
                        Time <span className="sm-required">*</span>
                      </label>
                      <input
                        type="time"
                        className={`sm-input${errors.time ? ' sm-input-error' : ''}`}
                        value={form.time}
                        onChange={e => handleChange('time', e.target.value)}
                      />
                      {errors.time && (
                        <span className="sm-error-msg">
                          <i className="bx bx-error-circle"></i>{errors.time}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mode */}
                  <div className="sm-field">
                    <label className="sm-label">
                      <i className="bx bx-signal-5"></i>
                      Mode <span className="sm-required">*</span>
                    </label>
                    <div className="sm-mode-options">
                      <button
                        type="button"
                        className={`sm-mode-btn${form.mode === 'Online' ? ' active' : ''}`}
                        onClick={() => handleChange('mode', 'Online')}
                      >
                        <i className="bx bx-wifi"></i>
                        Online
                      </button>
                      <button
                        type="button"
                        className={`sm-mode-btn${form.mode === 'Offline' ? ' active' : ''}`}
                        onClick={() => handleChange('mode', 'Offline')}
                      >
                        <i className="bx bx-buildings"></i>
                        Offline
                      </button>
                    </div>
                    {errors.mode && (
                      <span className="sm-error-msg">
                        <i className="bx bx-error-circle"></i>{errors.mode}
                      </span>
                    )}
                  </div>

                  {/* Auto-generated Meeting Link — only if Online */}
                  {form.mode === 'Online' && (
                    <div className="sm-field sm-field-animate">
                      <label className="sm-label">
                        <i className="bx bx-link"></i>
                        Meeting Link
                        <span className="sm-auto-badge">Auto Generated</span>
                      </label>
                      <div className="sm-link-row">
                        <div className="sm-link-display">
                          <i className="bx bx-video"></i>
                          <span className="sm-link-text">{form.link}</span>
                        </div>
                        <button
                          type="button"
                          className="sm-regen-btn"
                          onClick={handleRegenerateLink}
                          title="Generate new link"
                        >
                          <i className="bx bx-refresh"></i>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer */}
                <div className="sm-modal-footer">
                  <button className="sm-cancel-btn" onClick={closeModal}>Cancel</button>
                  <button className="sm-confirm-btn" onClick={handleConfirm}>
                    <i className="bx bx-check-circle"></i>
                    Confirm Schedule
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default ScheduleMeeting;
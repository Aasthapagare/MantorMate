import React, { useEffect, useState } from 'react';
import meetingService from '../services/meetingService';
import '../styles/scheduleMeeting.css';

const normalizeNumericId = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }

  const directNumber = Number(normalized);
  if (Number.isFinite(directNumber)) {
    return directNumber;
  }

  const digitsOnly = normalized.replace(/\D/g, '');
  if (!digitsOnly) {
    return null;
  }

  const extractedNumber = Number(digitsOnly);
  return Number.isFinite(extractedNumber) ? extractedNumber : null;
};

const formatMeetingMode = (value) => {
  const normalized = String(value || '').trim().toUpperCase();
  if (normalized === 'ONLINE') {
    return 'Online';
  }
  if (normalized === 'OFFLINE') {
    return 'Offline';
  }
  return value || 'Not selected';
};

const parseDateTime = (value) => {
  if (!value) {
    return null;
  }

  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) {
    return direct;
  }

  const fallback = new Date(String(value).replace(' ', 'T'));
  return Number.isNaN(fallback.getTime()) ? null : fallback;
};

const formatDate = (value) => {
  const parsed = parseDateTime(value);
  if (!parsed) {
    return '';
  }
  return parsed.toISOString().slice(0, 10);
};

const formatDisplayDate = (value) => {
  const parsed = parseDateTime(value);
  if (!parsed) {
    return 'Not available';
  }
  return parsed.toLocaleDateString('en-GB');
};

const formatDisplayTime = (value) => {
  const parsed = parseDateTime(value);
  if (!parsed) {
    return 'Not available';
  }
  return parsed.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const mapMeetings = (meetings) =>
  [...meetings]
    .sort((left, right) => {
      const leftTime = parseDateTime(left.requestedAt)?.getTime() || 0;
      const rightTime = parseDateTime(right.requestedAt)?.getTime() || 0;
      return rightTime - leftTime;
    })
    .map((meeting) => ({
      id: meeting.id,
      student: meeting.studentName || 'Unknown Student',
      enrollment: meeting.studentEnrollment || meeting.studentId || 'Not available',
      topic: meeting.topic,
      status: meeting.status,
      requestedAt: meeting.requestedAt,
      requestedDate: formatDisplayDate(meeting.requestedAt),
      requestedTime: formatDisplayTime(meeting.requestedAt),
      scheduledDate: formatDate(meeting.scheduledTime),
      scheduledDisplayDate: formatDisplayDate(meeting.scheduledTime),
      scheduledTime: meeting.scheduledTime ? String(meeting.scheduledTime).slice(11, 16) : '',
      scheduledDisplayTime: formatDisplayTime(meeting.scheduledTime),
      mode: formatMeetingMode(meeting.meetingMode),
      link: meeting.meetingLink || ''
    }));

const ScheduleMeeting = ({ onBack, onOpenMeetingRoom }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [guideId, setGuideId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form, setForm] = useState({ date: '', time: '' });
  const [errors, setErrors] = useState({});
  const [successId, setSuccessId] = useState(null);
  const [modalMode, setModalMode] = useState('approve');
  const [submitting, setSubmitting] = useState(false);

  const refreshMeetings = async (currentGuideId) => {
    const data = await meetingService.getGuideMeetings(currentGuideId);
    setRequests(mapMeetings(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        setLoading(true);
        setError('');
        const id = normalizeNumericId(localStorage.getItem('userId'));
        if (!id) {
          throw new Error('Guide ID not found');
        }
        setGuideId(id);
        await refreshMeetings(id);
      } catch (err) {
        console.error('Error fetching meetings:', err);
        setError(err.message || 'Failed to load meetings');
      } finally {
        setLoading(false);
      }
    };

    loadMeetings();
  }, []);

  const pendingList = requests.filter((request) => request.status === 'PENDING');
  const scheduledList = requests.filter((request) => request.status === 'APPROVED' || request.status === 'COMPLETED');

  const openModal = (request, mode = 'approve') => {
    setSelectedRequest(request);
    setModalMode(mode);
    setForm({
      date: request.scheduledDate || '',
      time: request.scheduledTime || ''
    });
    setErrors({});
    setSuccessId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setErrors({});
    setSubmitting(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '', submit: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.date) {
      nextErrors.date = 'Date is required';
    }
    if (!form.time) {
      nextErrors.time = 'Time is required';
    }
    return nextErrors;
  };

  const handleConfirm = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const scheduledTime = `${form.date}T${form.time}:00`;
      await meetingService.approveMeeting(selectedRequest.id, scheduledTime);
      await refreshMeetings(guideId);
      setSuccessId(selectedRequest.id);
      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (err) {
      console.error('Approve error:', err);
      setSubmitting(false);
      setErrors({ submit: err.message || 'Failed to approve meeting' });
    }
  };

  const handleReject = async (meetingId) => {
    try {
      await meetingService.rejectMeeting(meetingId);
      await refreshMeetings(guideId);
    } catch (err) {
      alert(err.message || 'Reject failed');
    }
  };

  const handleJoinMeeting = (meetingLink) => {
    if (!meetingLink) {
      alert('Meeting link is not available.');
      return;
    }
    window.open(meetingLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="sm-container">
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
            <p className="sm-page-sub">Review Student requests.</p>
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

      {loading && <div className="sm-empty"><i className="bx bx-loader-alt bx-spin"></i><p>Loading...</p></div>}
      {!loading && error && <div className="sm-empty"><i className="bx bx-error"></i><p>{error}</p></div>}

      {!loading && !error && pendingList.length > 0 && (
        <div className="sm-section-card">
          <div className="sm-section-head">
            <i className="bx bx-time-five"></i>
            <h3>Pending Requests</h3>
          </div>
          <div className="sm-table-wrap">
            <table className="sm-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Enrollment</th>
                  <th>Requested Date</th>
                  <th>Requested Time</th>
                  <th>Mode</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((request) => (
                  <tr key={request.id}>
                    <td>{request.student}</td>
                    <td>{request.enrollment}</td>
                    <td>{request.requestedDate}</td>
                    <td>{request.requestedTime}</td>
                    <td>{request.mode}</td>
                    <td>{request.topic}</td>
                    <td>
                      <button className="sm-approve-btn" onClick={() => openModal(request, 'approve')}>
                        Approve
                      </button>
                      <button className="sm-reject-btn" onClick={() => handleReject(request.id)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && scheduledList.length > 0 && (
        <div className="sm-section-card">
          <div className="sm-section-head">
            <i className="bx bx-check-circle"></i>
            <h3>Approved Meetings</h3>
          </div>
          <div className="sm-table-wrap">
            <table className="sm-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mode</th>
                  <th>Topic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduledList.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>{meeting.student}</td>
                    <td>{meeting.scheduledDisplayDate}</td>
                    <td>{meeting.scheduledDisplayTime}</td>
                    <td>{meeting.mode}</td>
                    <td>{meeting.topic}</td>
                    <td>
                      <button className="sm-view-btn" onClick={() => openModal(meeting, 'view')}>
                        <i className="bx bx-show"></i> View
                      </button>
                      {meeting.link && (
                        <button className="sm-approve-btn" onClick={() => handleJoinMeeting(meeting.link)}>
                          Join
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && pendingList.length === 0 && scheduledList.length === 0 && (
        <div className="sm-empty">
          <i className="bx bx-calendar-check"></i>
          <p>No meeting requests yet</p>
        </div>
      )}

      {showModal && selectedRequest && (
        <div className="sm-overlay" onClick={closeModal}>
          <div className="sm-modal" onClick={(event) => event.stopPropagation()}>
            <div className="sm-modal-header">
              <div className="sm-modal-title-wrap">
                <div className="sm-modal-icon-box">
                  <i className={`bx ${modalMode === 'approve' ? 'bx-calendar-check' : 'bx-show-alt'}`}></i>
                </div>
                <div>
                  <h3>{modalMode === 'approve' ? 'Approve Meeting' : 'Meeting Details'}</h3>
                  <p>Student: <strong>{selectedRequest.student}</strong></p>
                </div>
              </div>
              <button className="sm-modal-close" onClick={closeModal}>
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div className="sm-modal-body">
              {successId === selectedRequest.id ? (
                <div className="sm-success-state">
                  <div className="sm-success-icon">
                    <i className="bx bx-check"></i>
                  </div>
                  <h4>Meeting scheduled successfully</h4>
                </div>
              ) : (
                <>
                  <div className="sm-request-info">
                    <div className="sm-request-info-item">
                      <i className="bx bx-book-content"></i>
                      <span>{selectedRequest.topic}</span>
                    </div>
                    <div className="sm-request-info-item">
                      <i className="bx bx-id-card"></i>
                      <span>{selectedRequest.enrollment}</span>
                    </div>
                    <div className="sm-request-info-item">
                      <i className="bx bx-video"></i>
                      <span>{selectedRequest.mode}</span>
                    </div>
                  </div>

                  <div className="sm-form">
                    <div className="sm-form-row">
                      <div className="sm-field">
                        <label className="sm-label">
                          <i className="bx bx-calendar"></i>
                          Date
                          {modalMode === 'approve' && <span className="sm-required">*</span>}
                        </label>
                        <input
                          type="date"
                          className={`sm-input ${errors.date ? 'sm-input-error' : ''}`}
                          value={form.date}
                          onChange={(event) => handleChange('date', event.target.value)}
                          readOnly={modalMode === 'view'}
                        />
                        {errors.date && <span className="sm-error-msg"><i className="bx bx-error-circle"></i>{errors.date}</span>}
                      </div>

                      <div className="sm-field">
                        <label className="sm-label">
                          <i className="bx bx-time"></i>
                          Time
                          {modalMode === 'approve' && <span className="sm-required">*</span>}
                        </label>
                        <input
                          type="time"
                          className={`sm-input ${errors.time ? 'sm-input-error' : ''}`}
                          value={form.time}
                          onChange={(event) => handleChange('time', event.target.value)}
                          readOnly={modalMode === 'view'}
                        />
                        {errors.time && <span className="sm-error-msg"><i className="bx bx-error-circle"></i>{errors.time}</span>}
                      </div>
                    </div>

                    <div className="sm-field">
                      <label className="sm-label">
                        <i className="bx bx-video"></i>
                        Meeting Mode
                      </label>
                      <input type="text" className="sm-input" value={selectedRequest.mode} readOnly />
                    </div>

                    {selectedRequest.link && (
                      <button
                        type="button"
                        className="sm-join-link"
                        onClick={() => handleJoinMeeting(selectedRequest.link)}
                      >
                        <i className="bx bx-link-external"></i>
                        Join Meeting
                      </button>
                    )}

                    {errors.submit && <span className="sm-error-msg"><i className="bx bx-error-circle"></i>{errors.submit}</span>}

                    <div className="sm-modal-footer">
                      <button className="sm-cancel-btn" onClick={closeModal}>
                        {modalMode === 'approve' ? 'Cancel' : 'Close'}
                      </button>
                      {modalMode === 'approve' && (
                        <button className="sm-confirm-btn" onClick={handleConfirm} disabled={submitting}>
                          <i className={`bx ${submitting ? 'bx-loader-alt bx-spin' : 'bx-check-circle'}`}></i>
                          {submitting ? 'Scheduling...' : 'Confirm Schedule'}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;

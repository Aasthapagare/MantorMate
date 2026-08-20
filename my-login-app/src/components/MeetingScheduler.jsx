import React, { useEffect, useState } from 'react';
import meetingService from '../services/meetingService';
import '../styles/scheduleMeeting.css';

const GUIDE_API_URL = 'http://localhost:9095/groups/guides';
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

const formatDateTime = (value, fallback = 'Pending schedule') => {
  if (!value) {
    return fallback;
  }

  return String(value).slice(0, 16).replace('T', ' ');
};

const MeetingScheduler = ({ username, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('request');
  const [availableGuides, setAvailableGuides] = useState([]);
  const [approvedMeetings, setApprovedMeetings] = useState([]);
  const [meetingHistory, setMeetingHistory] = useState([]);
  const [guidesLoading, setGuidesLoading] = useState(true);
  const [guidesError, setGuidesError] = useState('');
  const [approvedLoading, setApprovedLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [approvedError, setApprovedError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentId: localStorage.getItem('userId') || username || '',
    guideId: '',
    topic: '',
    meetingMode: ''
  });

  const studentNumericId = normalizeNumericId(localStorage.getItem('userId'));

  const getGuideName = (guideId) => {
    const matchedGuide = availableGuides.find((guide) => String(guide.userId) === String(guideId));
    return matchedGuide?.name || `Guide ${guideId}`;
  };

  const fetchGuides = async () => {
    try {
      setGuidesLoading(true);
      setGuidesError('');
      const token = localStorage.getItem('token');
      const response = await fetch(GUIDE_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch guides');
      }

      const data = await response.json();
      setAvailableGuides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching guides:', error);
      setGuidesError('Guide list load nahi ho saki.');
      setAvailableGuides([]);
    } finally {
      setGuidesLoading(false);
    }
  };

  const fetchApprovedMeetings = async () => {
    try {
      setApprovedLoading(true);
      setApprovedError('');

      if (!studentNumericId) {
        setApprovedMeetings([]);
        return;
      }

      const data = await meetingService.getStudentApprovedMeetings(studentNumericId);
      setApprovedMeetings(
        data.map((meeting) => ({
          id: meeting.id,
          topic: meeting.topic,
          guideId: meeting.guideId,
          guideName: getGuideName(meeting.guideId),
          scheduledTime: formatDateTime(meeting.scheduledTime, 'Not scheduled'),
          meetingMode: formatMeetingMode(meeting.meetingMode),
          status: meeting.status,
          meetingLink: meeting.meetingLink
        }))
      );
    } catch (error) {
      console.error('Approved meetings error:', error);
      setApprovedError('Approved meetings load nahi ho saki.');
      setApprovedMeetings([]);
    } finally {
      setApprovedLoading(false);
    }
  };

  const fetchMeetingHistory = async () => {
    try {
      setHistoryLoading(true);

      if (!studentNumericId) {
        setMeetingHistory([]);
        return;
      }

      const data = await meetingService.getStudentAllMeetings(studentNumericId);
      setMeetingHistory(
        data.map((meeting) => ({
          id: meeting.id,
          topic: meeting.topic,
          guideId: meeting.guideId,
          guideName: getGuideName(meeting.guideId),
          meetingMode: formatMeetingMode(meeting.meetingMode),
          status: meeting.status,
          scheduledTime: formatDateTime(meeting.scheduledTime || meeting.requestedAt)
        }))
      );
    } catch (error) {
      console.error('Meeting history error:', error);
      setMeetingHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const refreshMeetings = async () => {
    await Promise.all([fetchApprovedMeetings(), fetchMeetingHistory()]);
  };

  useEffect(() => {
    const studentId = localStorage.getItem('userId') || username || '';
    setFormData((prev) => ({ ...prev, studentId }));
  }, [username]);

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    refreshMeetings();
  }, [availableGuides.length]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (submitError) {
      setSubmitError('');
    }
    if (submitSuccess) {
      setSubmitSuccess('');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const guideId = normalizeNumericId(formData.guideId);
    if (!studentNumericId) {
      setSubmitError('Cannot find  student id, kindly login again..');
      return;
    }
    if (!guideId) {
      setSubmitError('Select a valid guide.');
      return;
    }

    const meetingData = {
      studentId: studentNumericId,
      studentName: localStorage.getItem('name') || username || 'Student',
      guideIdentifier: String(formData.guideId).trim(),
      guideId,
      topic: formData.topic.trim(),
      meetingMode: formData.meetingMode,
      status: 'PENDING'
    };

    try {
      setSubmitting(true);
      setSubmitError('');
      setSubmitSuccess('');
      await meetingService.createMeetingRequest(meetingData);
      setSubmitSuccess('Meeting request sent.');
      setFormData((prev) => ({
        ...prev,
        guideId: '',
        topic: '',
        meetingMode: ''
      }));
      await refreshMeetings();
      setActiveTab('history');
    } catch (error) {
      setSubmitError(error.message || 'Cannot send meeting request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinMeeting = (meetingLink) => {
    if (meetingLink) {
      window.open(meetingLink, '_blank', 'noopener,noreferrer');
      return;
    }
    alert('Meeting link is not available.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return '#1abc9c';
      case 'PENDING':
        return '#f39c12';
      case 'REJECTED':
        return '#e74c3c';
      case 'COMPLETED':
        return '#95a5a6';
      default:
        return '#34495e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bx-check-circle';
      case 'PENDING':
        return 'bx-time-five';
      case 'REJECTED':
        return 'bx-x-circle';
      case 'COMPLETED':
        return 'bx-check-double';
      default:
        return 'bx-help-circle';
    }
  };

  const renderMeetingRequest = () => (
    <div className="screen-container">
      <div className="form-card">
        <div className="form-header">
          <div className="form-header-icon">
            <i className="bx bx-calendar-plus"></i>
          </div>
          <div className="form-header-text">
            <h3 className="form-title">Request New Meeting</h3>
            <p className="form-subtitle">Select a guide,topic and mode.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="meeting-form">
          <div className="form-group">
            <label htmlFor="studentId">
              <i className="bx bx-user"></i>
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
                <i className="bx bx-lock-alt"></i>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guideId">
              <i className="bx bx-user-check"></i>
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
                disabled={guidesLoading}
              >
                <option value="">{guidesLoading ? '-- Loading guides --' : '-- Choose your guide --'}</option>
                {availableGuides.map((guide) => (
                  <option key={guide.userId} value={guide.userId}>
                    {guide.name} ({guide.email})
                  </option>
                ))}
              </select>
              <div className="select-icon">
                <i className="bx bx-chevron-down"></i>
              </div>
            </div>
            {guidesError && <span className="sm-error-msg">{guidesError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="topic">
              <i className="bx bx-message-detail"></i>
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
                placeholder="e.g. Project progress discussion"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="meetingMode">
              <i className="bx bx-video"></i>
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
                <option value="ONLINE">Online Meeting</option>
                <option value="OFFLINE">In-Person Meeting</option>
              </select>
              <div className="select-icon">
                <i className="bx bx-chevron-down"></i>
              </div>
            </div>
          </div>

          {submitSuccess && (
            <div className="sm-success-state">
              <p>{submitSuccess}</p>
            </div>
          )}
          {submitError && <div className="sm-error-msg">{submitError}</div>}

          <button type="submit" className="submit-btn" disabled={submitting || guidesLoading}>
            <i className={`bx ${submitting ? 'bx-loader-alt bx-spin' : 'bx-send'}`}></i>
            <span>{submitting ? 'Requesting...' : 'Request Meeting'}</span>
            <div className="btn-shine"></div>
          </button>
        </form>
      </div>
    </div>
  );

  const renderApprovedMeetings = () => (
    <div className="screen-container">
      {approvedLoading && <div className="sm-empty"><i className="bx bx-loader-alt bx-spin"></i><p>Loading approved meetings...</p></div>}
      {approvedError && <div className="sm-empty"><i className="bx bx-error"></i><p>{approvedError}</p></div>}
      {!approvedLoading && !approvedError && approvedMeetings.length === 0 && (
        <div className="sm-empty">
          <i className="bx bx-calendar-check"></i>
          <p>No approved meetings yet</p>
        </div>
      )}
      <div className="meetings-grid">
        {approvedMeetings.map((meeting) => (
          <div key={meeting.id} className="meeting-card">
            <div className="meeting-header">
              <h4 className="meeting-topic">{meeting.topic}</h4>
              <div className="status-badge" style={{ backgroundColor: getStatusColor(meeting.status) }}>
                <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
                {meeting.status}
              </div>
            </div>

            <div className="meeting-details">
              <div className="detail-item">
                <i className="bx bx-user-check"></i>
                <span>{meeting.guideName}</span>
              </div>
              <div className="detail-item">
                <i className="bx bx-time"></i>
                <span>{meeting.scheduledTime}</span>
              </div>
              <div className="detail-item">
                <i className="bx bx-video"></i>
                <span>{meeting.meetingMode}</span>
              </div>
            </div>

            <div className="meeting-actions">
              {meeting.status === 'APPROVED' && meeting.meetingLink && (
                <button className="join-btn" onClick={() => handleJoinMeeting(meeting.meetingLink)}>
                  <i className="bx bx-video-plus"></i>
                  Join Meeting
                </button>
              )}
              {meeting.status === 'APPROVED' && !meeting.meetingLink && (
                <div className="pending-message">
                  <i className="bx bx-time-five"></i>
                  Waiting for meeting link
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
      {historyLoading && <div className="sm-empty"><i className="bx bx-loader-alt bx-spin"></i><p>Loading meeting history...</p></div>}
      {!historyLoading && meetingHistory.length === 0 && (
        <div className="sm-empty">
          <i className="bx bx-history"></i>
          <p>No meeting requests yet</p>
        </div>
      )}

      {!historyLoading && meetingHistory.length > 0 && (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th><i className="bx bx-message-detail"></i> Topic</th>
                <th><i className="bx bx-user-check"></i> Guide</th>
                <th><i className="bx bx-video"></i> Mode</th>
                <th><i className="bx bx-time"></i> Time</th>
                <th><i className="bx bx-info-circle"></i> Status</th>
              </tr>
            </thead>
            <tbody>
              {meetingHistory.map((meeting) => (
                <tr key={meeting.id}>
                  <td className="topic-cell">{meeting.topic}</td>
                  <td className="guide-cell">
                    <div className="guide-info">
                      <span className="guide-id">{meeting.guideId}</span>
                      <span className="guide-name">{meeting.guideName}</span>
                    </div>
                  </td>
                  <td className="time-cell">{meeting.meetingMode}</td>
                  <td className="time-cell">{meeting.scheduledTime}</td>
                  <td className="status-cell">
                    <div className="status-badge-small" style={{ backgroundColor: getStatusColor(meeting.status) }}>
                      <i className={`bx ${getStatusIcon(meeting.status)}`}></i>
                      {meeting.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      <div className="meeting-scheduler-page">
        <header className="custom-header">
          <div className="header-content">
            <h1 className="page-title">Schedule Meeting</h1>
            <nav className="tab-navigation">
              <button className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`} onClick={() => setActiveTab('request')}>
                <i className="bx bx-calendar-plus"></i>
                <span>Meeting Request</span>
              </button>
              <button className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>
                <i className="bx bx-check-circle"></i>
                <span>Approved Meetings</span>
              </button>
              <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                <i className="bx bx-history"></i>
                <span>Meeting History</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="content-area">
          {activeTab === 'request' && renderMeetingRequest()}
          {activeTab === 'approved' && renderApprovedMeetings()}
          {activeTab === 'history' && renderMeetingHistory()}
        </main>

        <button className="close-btn" onClick={() => onNavigate && onNavigate('dashboard')}>
          <i className="bx bx-x"></i>
        </button>
      </div>
    </>
  );
};

export default MeetingScheduler;

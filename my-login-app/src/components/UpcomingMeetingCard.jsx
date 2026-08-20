import React from 'react';
import { formatMeetingDate, getMeetingCountdown, isMeetingJoinable } from '../utils/meetingHelpers';

const UpcomingMeetingCard = ({ meeting, roleLabel, loading, onOpenSchedule, onJoin }) => {
  if (loading) {
    return (
      <section className="upcoming-meeting-section">
        <div className="upcoming-meeting-card">
          <div className="upcoming-meeting-state">
            <i className="bx bx-loader-alt bx-spin"></i>
            <p>Loading upcoming meeting...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!meeting) {
    return (
      <section className="upcoming-meeting-section">
        <div className="upcoming-meeting-card">
          <div className="upcoming-meeting-state">
            <i className="bx bx-calendar-check"></i>
            <h3>No upcoming meeting</h3>
            <p>Your next approved meeting will appear here.</p>
            <button className="upcoming-secondary-btn" onClick={onOpenSchedule}>
              Open Schedule
            </button>
          </div>
        </div>
      </section>
    );
  }

  const joinable = isMeetingJoinable(meeting);

  return (
    <section className="upcoming-meeting-section">
      <div className="upcoming-meeting-card">
        <div className="upcoming-meeting-top">
          <div>
            <span className="upcoming-kicker">Upcoming Meeting</span>
            <h3>{meeting.topic || 'Scheduled Meeting'}</h3>
            <p className="upcoming-role-line">{roleLabel}</p>
          </div>
          <span className={`upcoming-status-badge ${joinable ? 'live' : ''}`}>
            {joinable ? 'Live' : 'Scheduled'}
          </span>
        </div>

        <div className="upcoming-meta-grid">
          <div className="upcoming-meta-item">
            <i className="bx bx-time-five"></i>
            <div>
              <span>Time</span>
              <strong>{formatMeetingDate(meeting.scheduledTime)}</strong>
            </div>
          </div>

          <div className="upcoming-meta-item">
            <i className="bx bx-video"></i>
            <div>
              <span>Mode</span>
              <strong>{meeting.meetingMode || 'Online'}</strong>
            </div>
          </div>
        </div>

        <div className="upcoming-footer-row">
          <p className="upcoming-countdown">{getMeetingCountdown(meeting)}</p>
          <div className="upcoming-actions">
            <button className="upcoming-secondary-btn" onClick={onOpenSchedule}>
              View All
            </button>
            <button
              className="upcoming-primary-btn"
              onClick={() => onJoin(meeting)}
              disabled={!joinable}
            >
              {joinable ? 'Join Now' : 'Wait for Time'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMeetingCard;

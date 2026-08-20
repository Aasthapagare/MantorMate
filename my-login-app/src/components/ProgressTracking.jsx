import React, { useEffect, useState } from 'react';
import '../styles/progressTracking.css';
import { getGuideGroups, getStudentGuideProgress } from '../services/guideAttendanceService';

const average = (values) => {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const ProgressTracking = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const guideGroups = await getGuideGroups();

        const progressCards = await Promise.all(
          (guideGroups || []).map(async (group) => {
            const members = (group.memberDetails || []).length
              ? group.memberDetails
              : (group.members || []).map((memberId) => ({ userId: memberId }));

            const memberProgress = await Promise.all(
              members.map(async (member) => {
                try {
                  return await getStudentGuideProgress(member.userId);
                } catch (error) {
                  return { meetings: 0, presentations: 0, milestones: 0, overall: 0 };
                }
              })
            );

            const overall = average(memberProgress.map((item) => item.overall || 0));

            return {
              id: group.groupId,
              groupName: group.groupName,
              projectTitle: group.projectTitle || 'Project not submitted',
              presentationsAttended: Math.round(average(memberProgress.map((item) => item.presentations || 0))),
              milestonesCompleted: Math.round(average(memberProgress.map((item) => item.milestones || 0))),
              meetingCount: Math.round(average(memberProgress.map((item) => item.meetings || 0))),
              overall: Math.round(overall),
              status: overall >= 75 ? 'Ahead' : overall >= 40 ? 'On Track' : 'Delayed'
            };
          })
        );

        setGroups(progressCards);
      } catch (error) {
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  const getProgressColor = (progress) => {
    if (progress >= 71) return '#28a745';
    if (progress >= 41) return '#ffc107';
    return '#dc3545';
  };

  const getStatusClass = (status) => {
    if (status === 'Ahead') return 'status-ahead';
    if (status === 'Delayed') return 'status-delayed';
    return 'status-ontrack';
  };

  const getBandClass = (status) => {
    if (status === 'Ahead') return 'ahead';
    if (status === 'Delayed') return 'delayed';
    return 'ontrack';
  };

  if (loading) {
    return (
      <div className="progress-tracking-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="progress-tracking-container">
        <div className="empty-state">
          <i className="bx bx-bar-chart-alt-2"></i>
          <p>No progress data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-tracking-container">
      <div className="progress-header">
        <h2>Progress Tracking</h2>
        <p>Monitor progress for your assigned groups</p>
      </div>

      <div className="progress-cards-grid">
        {groups.map((group) => (
          <div className="progress-card" key={group.id}>
            <div className={`card-band ${getBandClass(group.status)}`}></div>

            <div className="card-top">
              <div className="group-info">
                <h3>{group.groupName}</h3>
                <p>{group.projectTitle}</p>
              </div>
              <span className={`status-badge ${getStatusClass(group.status)}`}>
                {group.status}
              </span>
            </div>

            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-slideshow"></i>
                </div>
                <span className="metric-value">{group.presentationsAttended}%</span>
                <span className="metric-label">Presentations</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-target-lock"></i>
                </div>
                <span className="metric-value" style={{ color: getProgressColor(group.milestonesCompleted) }}>
                  {group.milestonesCompleted}%
                </span>
                <span className="metric-label">Milestones</span>
              </div>

              <div className="metric-box">
                <div className="metric-icon">
                  <i className="bx bx-calendar-event"></i>
                </div>
                <span className="metric-value">{group.meetingCount}%</span>
                <span className="metric-label">Meetings</span>
              </div>
            </div>

            <div className="progress-bar-section">
              <div className="bar-header">
                <span>Overall Progress</span>
                <span style={{ color: getProgressColor(group.overall) }}>
                  {group.overall}%
                </span>
              </div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${group.overall}%`,
                    backgroundColor: getProgressColor(group.overall)
                  }}
                ></div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracking;

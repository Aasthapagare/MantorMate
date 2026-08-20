import React, { useEffect, useMemo, useState } from 'react';
import '../styles/meetingAttendance.css';
import { getAllUsers, getGuideGroups, submitMeetingAttendance } from '../services/guideAttendanceService';

const initialMeeting = { date: '', mode: '', notes: '' };

const getGroupMembers = (group, usersById) =>
  group?.memberDetails?.length
    ? group.memberDetails
    : (group?.members || []).map((memberId) => ({
        userId: memberId,
        name: usersById.get(memberId)?.name || memberId
      }));

const MeetingAttendance = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [usersById, setUsersById] = useState(new Map());
  const [meeting, setMeeting] = useState(initialMeeting);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true);
        const [groupData, userData] = await Promise.all([
          getGuideGroups(),
          getAllUsers()
        ]);

        setGroups(groupData || []);
        setUsersById(new Map((userData || []).map((user) => [user.userId, user])));

        if (groupData?.length) {
          setSelectedGroup(String(groupData[0].groupId));
        }
      } catch (err) {
        setError(err.message || 'Unable to load groups.');
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  const currentGroup = useMemo(
    () => groups.find((group) => String(group.groupId) === selectedGroup) || null,
    [groups, selectedGroup]
  );

  const members = getGroupMembers(currentGroup, usersById);

  const handleSubmit = async () => {
    if (!currentGroup) {
      alert('Please select a group.');
      return;
    }

    if (!meeting.date || !meeting.mode) {
      alert('Please select date and mode.');
      return;
    }

    try {
      setSubmitting(true);

      await Promise.all(
        members.map((student) =>
          submitMeetingAttendance({
            studentId: student.userId,
            guideId: localStorage.getItem('userId'),
            meetingDate: meeting.date,
            mode: meeting.mode.toUpperCase(),
            notes: meeting.notes
          })
        )
      );

      alert(`Meeting marked for all students in ${currentGroup.groupName}!`);
      setMeeting(initialMeeting);
    } catch (err) {
      alert(err.message || 'Failed to submit meeting attendance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="meeting-attendance-container">
      <div className="team-selector">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="team-select"
          disabled={!groups.length}
        >
          {groups.length === 0 && <option value="">No groups assigned</option>}
          {groups.map((group) => (
            <option key={group.groupId} value={group.groupId}>
              {group.groupName} - {group.projectTitle || 'Project not submitted'}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="attendance-feedback error-text">{error}</p>}

      {currentGroup && (
        <div className="team-info-card">
          <div>
            <h3>{currentGroup.groupName}</h3>
            <p>{currentGroup.projectTitle || 'Project title not available'}</p>
          </div>
          <span className="student-count">
            {members.length} Students
          </span>
        </div>
      )}

      <div className="attendance-table-wrapper">
        <table className="attendance-table meeting-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Date</th>
              <th>Mode</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="group-name-cell">
                <div className="group-badge">
                  {currentGroup?.groupName || 'Select Group'}
                </div>
              </td>

              <td className="meeting-cell">
                <input
                  type="date"
                  value={meeting.date}
                  onChange={(e) => setMeeting((prev) => ({ ...prev, date: e.target.value }))}
                  className="meeting-date-input"
                />
              </td>

              <td className="meeting-cell">
                <select
                  value={meeting.mode}
                  onChange={(e) => setMeeting((prev) => ({ ...prev, mode: e.target.value }))}
                  className="meeting-select meeting-mode-select"
                >
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </td>

              <td className="notes-cell">
                <textarea
                  placeholder="e.g. Discussion about backend integration"
                  value={meeting.notes}
                  onChange={(e) => setMeeting((prev) => ({ ...prev, notes: e.target.value }))}
                  rows="2"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="meeting-member-list">
        {members.map((student) => (
          <span key={student.userId} className="member-pill">
            {student.name}
          </span>
        ))}
      </div>

      <div className="meeting-footer single-action">
        <button className="submit-btn" onClick={handleSubmit} disabled={submitting || loading || !members.length}>
          <i className="bx bx-check-circle"></i>
          {submitting ? 'Saving...' : 'Mark Meeting'}
        </button>
      </div>
    </div>
  );
};

export default MeetingAttendance;

import React, { useEffect, useMemo, useState } from 'react';
import '../styles/presentationAttendance.css';
import {
  getAllUsers,
  getGuideGroups,
  getPresentationAttendance,
  getPresentationMilestones,
  getPresentationSchedules,
  submitPresentationAttendance
} from '../services/guideAttendanceService';

const buildStudents = (group, attendance = [], milestones = [], schedule = null, usersById = new Map()) => {
  const attendanceMap = new Map(attendance.map((item) => [item.studentId, item]));
  const milestoneMap = new Map(milestones.map((item) => [item.studentId, item]));
  const groupMembers = (group?.memberDetails?.length
    ? group.memberDetails
    : (group?.members || []).map((memberId) => ({
        userId: memberId,
        name: usersById.get(memberId)?.name || memberId
      })));

  return groupMembers.map((member) => {
    const savedAttendance = attendanceMap.get(member.userId);
    const savedMilestone = milestoneMap.get(member.userId);
    const fallbackUser = usersById.get(member.userId);

    return {
      studentId: member.userId,
      name: member.name || fallbackUser?.name || member.userId,
      enrollment: member.userId,
      attendance: savedAttendance?.attended || false,
      milestone: schedule?.milestoneName || 'Milestone not available',
      maxWeight: schedule?.milestoneWeight || 0,
      weight: savedMilestone?.weightage ?? schedule?.milestoneWeight ?? 0,
      milestoneCompleted: savedMilestone?.completed || false,
      notes: savedAttendance?.notes || ''
    };
  });
};

const PresentationAttendance = () => {
  const [groups, setGroups] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [students, setStudents] = useState([]);
  const [usersById, setUsersById] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [groupData, scheduleData] = await Promise.all([
          getGuideGroups(),
          getPresentationSchedules()
        ]);
        const userData = await getAllUsers();

        setUsersById(new Map((userData || []).map((user) => [user.userId, user])));

        setGroups(groupData || []);
        setSchedules(scheduleData || []);

        if (groupData?.length) {
          setSelectedGroup(String(groupData[0].groupId));
        }

        if (scheduleData?.length) {
          setSelectedSchedule(String(scheduleData[0].id));
        }
      } catch (err) {
        setError(err.message || 'Unable to load presentation attendance data.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const currentGroup = useMemo(
    () => groups.find((group) => String(group.groupId) === selectedGroup) || null,
    [groups, selectedGroup]
  );

  const currentSchedule = useMemo(
    () => schedules.find((schedule) => String(schedule.id) === selectedSchedule) || null,
    [schedules, selectedSchedule]
  );

  useEffect(() => {
    const loadGroupPresentationData = async () => {
      if (!currentGroup || !currentSchedule) {
        setStudents([]);
        return;
      }

      try {
        setLoading(true);
        const [attendanceData, milestoneData] = await Promise.all([
          getPresentationAttendance(currentSchedule.id),
          getPresentationMilestones(currentSchedule.id)
        ]);

        const groupMemberIds = new Set(
          (currentGroup.memberDetails?.length
            ? currentGroup.memberDetails
            : (currentGroup.members || []).map((memberId) => ({ userId: memberId }))
          ).map((member) => member.userId)
        );

        setStudents(
          buildStudents(
            currentGroup,
            (attendanceData || []).filter((item) => groupMemberIds.has(item.studentId)),
            (milestoneData || []).filter((item) => groupMemberIds.has(item.studentId)),
            currentSchedule,
            usersById
          )
        );
      } catch (err) {
        setError(err.message || 'Unable to load saved presentation attendance.');
      } finally {
        setLoading(false);
      }
    };

    loadGroupPresentationData();
  }, [currentGroup, currentSchedule, usersById]);

  const updateStudent = (studentId, updates) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId ? { ...student, ...updates } : student
      )
    );
  };

  const handleSubmit = async () => {
    if (!currentGroup || !currentSchedule) {
      alert('Please select a group and presentation date.');
      return;
    }

    try {
      setSubmitting(true);
      await submitPresentationAttendance({
        presentationId: currentSchedule.id,
        milestoneName: currentSchedule.milestoneName,
        entries: students.map((student) => ({
          studentId: student.studentId,
          attended: student.attendance,
          milestoneCompleted: student.milestoneCompleted,
          weightage: Number(student.weight) || 0,
          notes: student.notes,
          rating: 0
        }))
      });

      alert(`Attendance submitted for ${currentGroup.groupName}!`);
    } catch (err) {
      alert(err.message || 'Failed to submit attendance.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="presentation-attendance-container">
      <div className="team-selector selector-row">
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

        <select
          value={selectedSchedule}
          onChange={(e) => setSelectedSchedule(e.target.value)}
          className="team-select schedule-select"
          disabled={!schedules.length}
        >
          {schedules.length === 0 && <option value="">No presentation schedules</option>}
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.date} - {schedule.presentationTitle || `Presentation ${schedule.presentationNumber}`} - {schedule.milestoneName}
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
            {currentSchedule && (
              <p>{currentSchedule.presentationTitle || `Presentation ${currentSchedule.presentationNumber}`} | {currentSchedule.milestoneName}</p>
            )}
            {currentSchedule?.expectedCompletion && (
              <p>{currentSchedule.expectedCompletion}</p>
            )}
          </div>
          <span className="student-count">
            {students.length} Students
          </span>
        </div>
      )}

      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Enrollment</th>
              <th>Attendance</th>
              <th>Milestone</th>
              <th>Notes / Review</th>
            </tr>
          </thead>
          <tbody>
            {!loading && students.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-state-cell">No students found for this group.</td>
              </tr>
            )}

            {students.map((student) => (
              <tr key={student.studentId}>
                <td className="student-name-cell">
                  <div className="student-avatar">
                    {(student.name || student.enrollment).charAt(0)}
                  </div>
                  <span>{student.name}</span>
                </td>

                <td className="enrollment-cell">
                  {student.enrollment}
                </td>

                <td className="attendance-cell">
                  <label className="attendance-checkbox">
                    <input
                      type="checkbox"
                      checked={student.attendance}
                      onChange={(e) => updateStudent(student.studentId, { attendance: e.target.checked })}
                    />
                    <span className={student.attendance ? 'status-present' : 'status-absent'}>
                      {student.attendance ? 'Present' : 'Absent'}
                    </span>
                  </label>
                </td>

                <td className="milestone-cell">
                  <div className="milestone-info">
                    <div className="milestone-text">
                      <strong>{student.milestone}</strong>
                      <div className="weight-input-row">
                        <span className="weight-badge">Max: {student.maxWeight}</span>
                        <input
                          type="number"
                          min="0"
                          max={student.maxWeight}
                          value={student.weight}
                          onChange={(e) => updateStudent(student.studentId, { weight: e.target.value })}
                          className="weight-input"
                        />
                      </div>
                    </div>
                    <label className="milestone-checkbox">
                      <input
                        type="checkbox"
                        checked={student.milestoneCompleted}
                        onChange={(e) =>
                          updateStudent(student.studentId, {
                            milestoneCompleted: e.target.checked,
                            weight: e.target.checked ? student.weight : 0
                          })
                        }
                      />
                      <span>{student.milestoneCompleted ? 'Completed' : 'Mark Complete'}</span>
                    </label>
                  </div>
                </td>

                <td className="notes-cell">
                  <textarea
                    placeholder="Add notes or review..."
                    value={student.notes}
                    onChange={(e) => updateStudent(student.studentId, { notes: e.target.value })}
                    rows="2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit} disabled={submitting || loading}>
          <i className='bx bx-check-circle'></i>
          {submitting ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
};

export default PresentationAttendance;

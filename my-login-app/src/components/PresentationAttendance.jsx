// import React, { useState } from 'react';
// import '../styles/presentationAttendance.css';

// const PresentationAttendance = () => {
//   const [teams, setTeams] = useState([
//     {
//       id: 1,
//       teamName: 'Team Alpha',
//       projectTitle: 'AI Chatbot System',
//       students: [
//         { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001', attendance: false, milestone: 'UI Completed', weight: 10, milestoneCompleted: false, notes: '' },
//         { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002', attendance: false, milestone: 'Backend Integration', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003', attendance: false, milestone: 'Database Setup', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 4, name: 'Priya Desai', enrollment: '0827CS211004', attendance: false, milestone: 'API Development', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 5, name: 'Karan Singh', enrollment: '0827CS211005', attendance: false, milestone: 'Testing', weight: 8, milestoneCompleted: false, notes: '' }
//       ]
//     },
//     {
//       id: 2,
//       teamName: 'Team Beta',
//       projectTitle: 'E-Commerce Platform',
//       students: [
//         { id: 6, name: 'Pooja Sharma', enrollment: '0827CS211006', attendance: false, milestone: 'Frontend Design', weight: 10, milestoneCompleted: false, notes: '' },
//         { id: 7, name: 'Kunal Mehta', enrollment: '0827CS211007', attendance: false, milestone: 'Cart System', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 8, name: 'Meera Patel', enrollment: '0827CS211008', attendance: false, milestone: 'Payment Gateway', weight: 15, milestoneCompleted: false, notes: '' }
//       ]
//     },
//     {
//       id: 3,
//       teamName: 'Team Gamma',
//       projectTitle: 'IoT Smart Home',
//       students: [
//         { id: 9, name: 'Nikhil Rao', enrollment: '0827CS211009', attendance: false, milestone: 'Sensor Integration', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 10, name: 'Vivek Kumar', enrollment: '0827CS211010', attendance: false, milestone: 'Mobile App', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 11, name: 'Divya Singh', enrollment: '0827CS211011', attendance: false, milestone: 'Cloud Setup', weight: 10, milestoneCompleted: false, notes: '' }
//       ]
//     }
//   ]);

//   const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

//   const handleAttendanceChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, attendance: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleMilestoneChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, milestoneCompleted: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleNotesChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, notes: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleSubmit = () => {
//     const currentTeam = teams.find(t => t.id === selectedTeam);
//     const attendanceData = {
//       teamId: currentTeam.id,
//       teamName: currentTeam.teamName,
//       students: currentTeam.students.map(s => ({
//         studentId: s.id,
//         name: s.name,
//         enrollment: s.enrollment,
//         attendance: s.attendance ? 'Present' : 'Absent',
//         milestone: s.milestone,
//         milestoneCompleted: s.milestoneCompleted,
//         notes: s.notes
//       }))
//     };
    
//     console.log('Submitting attendance data:', attendanceData);
//     alert(`Attendance submitted for ${currentTeam.teamName}!\nCheck console for details.`);
//   };

//   const currentTeam = teams.find(t => t.id === selectedTeam);

//   return (
//     <div className="presentation-attendance-container">
//       <div className="attendance-header">
//         <h2>Presentation Attendance</h2>
//         <p>Track student attendance, milestones, and performance</p>
//       </div>

//       {/* Team Selector */}
//       <div className="team-selector">
//         <label>Select Team:</label>
//         <select 
//           value={selectedTeam} 
//           onChange={(e) => setSelectedTeam(Number(e.target.value))}
//           className="team-select"
//         >
//           {teams.map(team => (
//             <option key={team.id} value={team.id}>
//               {team.teamName} - {team.projectTitle}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Team Info */}
//       <div className="team-info-card">
//         <h3>{currentTeam.teamName}</h3>
//         <p>{currentTeam.projectTitle}</p>
//         <span className="student-count">
//           {currentTeam.students.length} Students
//         </span>
//       </div>

//       {/* Attendance Table */}
//       <div className="attendance-table-wrapper">
//         <table className="attendance-table">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Enrollment</th>
//               <th>Attendance</th>
//               <th>Milestone</th>
//               <th>Notes / Review</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTeam.students.map((student) => (
//               <tr key={student.id}>
//                 {/* Student Name */}
//                 <td className="student-name-cell">
//                   <div className="student-avatar">
//                     {student.name.charAt(0)}
//                   </div>
//                   <span>{student.name}</span>
//                 </td>

//                 {/* Enrollment */}
//                 <td className="enrollment-cell">
//                   {student.enrollment}
//                 </td>

//                 {/* Attendance */}
//                 <td className="attendance-cell">
//                   <label className="attendance-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={student.attendance}
//                       onChange={(e) => handleAttendanceChange(currentTeam.id, student.id, e.target.checked)}
//                     />
//                     <span className={student.attendance ? 'status-present' : 'status-absent'}>
//                       {student.attendance ? '✓ Present' : '✗ Absent'}
//                     </span>
//                   </label>
//                 </td>

//                 {/* Milestone */}
//                 <td className="milestone-cell">
//                   <div className="milestone-info">
//                     <div className="milestone-text">
//                       <strong>{student.milestone}</strong>
//                       <span className="weight-badge">Weight: {student.weight}</span>
//                     </div>
//                     <label className="milestone-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={student.milestoneCompleted}
//                         onChange={(e) => handleMilestoneChange(currentTeam.id, student.id, e.target.checked)}
//                       />
//                       <span>{student.milestoneCompleted ? 'Completed' : 'Mark Complete'}</span>
//                     </label>
//                   </div>
//                 </td>

//                 {/* Notes */}
//                 <td className="notes-cell">
//                   <textarea
//                     placeholder="Add notes or review..."
//                     value={student.notes}
//                     onChange={(e) => handleNotesChange(currentTeam.id, student.id, e.target.value)}
//                     rows="2"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Submit Button */}
//       <div className="submit-section">
//         <button className="submit-btn" onClick={handleSubmit}>
//           <i className='bx bx-check-circle'></i>
//           Submit Attendance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PresentationAttendance;

// import React, { useState } from 'react';
// import '../styles/presentationAttendance.css';

// const PresentationAttendance = () => {
//   const [teams, setTeams] = useState([
//     {
//       id: 1,
//       teamName: 'Team Alpha',
//       projectTitle: 'AI Chatbot System',
//       students: [
//         { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001', attendance: false, milestone: 'UI Completed', weight: 10, milestoneCompleted: false, notes: '' },
//         { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002', attendance: false, milestone: 'Backend Integration', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003', attendance: false, milestone: 'Database Setup', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 4, name: 'Priya Desai', enrollment: '0827CS211004', attendance: false, milestone: 'API Development', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 5, name: 'Karan Singh', enrollment: '0827CS211005', attendance: false, milestone: 'Testing', weight: 8, milestoneCompleted: false, notes: '' }
//       ]
//     },
//     {
//       id: 2,
//       teamName: 'Team Beta',
//       projectTitle: 'E-Commerce Platform',
//       students: [
//         { id: 6, name: 'Pooja Sharma', enrollment: '0827CS211006', attendance: false, milestone: 'Frontend Design', weight: 10, milestoneCompleted: false, notes: '' },
//         { id: 7, name: 'Kunal Mehta', enrollment: '0827CS211007', attendance: false, milestone: 'Cart System', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 8, name: 'Meera Patel', enrollment: '0827CS211008', attendance: false, milestone: 'Payment Gateway', weight: 15, milestoneCompleted: false, notes: '' }
//       ]
//     },
//     {
//       id: 3,
//       teamName: 'Team Gamma',
//       projectTitle: 'IoT Smart Home',
//       students: [
//         { id: 9, name: 'Nikhil Rao', enrollment: '0827CS211009', attendance: false, milestone: 'Sensor Integration', weight: 15, milestoneCompleted: false, notes: '' },
//         { id: 10, name: 'Vivek Kumar', enrollment: '0827CS211010', attendance: false, milestone: 'Mobile App', weight: 12, milestoneCompleted: false, notes: '' },
//         { id: 11, name: 'Divya Singh', enrollment: '0827CS211011', attendance: false, milestone: 'Cloud Setup', weight: 10, milestoneCompleted: false, notes: '' }
//       ]
//     }
//   ]);

//   const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

//   const handleAttendanceChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, attendance: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleMilestoneChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, milestoneCompleted: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleNotesChange = (teamId, studentId, value) => {
//     setTeams(teams.map(team => {
//       if (team.id === teamId) {
//         return {
//           ...team,
//           students: team.students.map(student => 
//             student.id === studentId ? { ...student, notes: value } : student
//           )
//         };
//       }
//       return team;
//     }));
//   };

//   const handleSubmit = () => {
//     const currentTeam = teams.find(t => t.id === selectedTeam);
//     const attendanceData = {
//       teamId: currentTeam.id,
//       teamName: currentTeam.teamName,
//       students: currentTeam.students.map(s => ({
//         studentId: s.id,
//         name: s.name,
//         enrollment: s.enrollment,
//         attendance: s.attendance ? 'Present' : 'Absent',
//         milestone: s.milestone,
//         milestoneCompleted: s.milestoneCompleted,
//         notes: s.notes
//       }))
//     };
    
//     console.log('Submitting attendance data:', attendanceData);
//     alert(`Attendance submitted for ${currentTeam.teamName}!\nCheck console for details.`);
//   };

//   const currentTeam = teams.find(t => t.id === selectedTeam);

//   return (
//     <div className="presentation-attendance-container">
//       <div className="attendance-header">
        
//         <p>Track student attendance, milestones, and performance</p>
//       </div>

//       {/* Team Selector */}
//       <div className="team-selector">
//         <label>Select Team:</label>
//         <select 
//           value={selectedTeam} 
//           onChange={(e) => setSelectedTeam(Number(e.target.value))}
//           className="team-select"
//         >
//           {teams.map(team => (
//             <option key={team.id} value={team.id}>
//               {team.teamName} - {team.projectTitle}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Team Info */}
//       <div className="team-info-card">
//         <h3>{currentTeam.teamName}</h3>
//         <p>{currentTeam.projectTitle}</p>
//         <span className="student-count">
//           {currentTeam.students.length} Students
//         </span>
//       </div>

//       {/* Attendance Table */}
//       <div className="attendance-table-wrapper">
//         <table className="attendance-table">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Enrollment</th>
//               <th>Attendance</th>
//               <th>Milestone</th>
//               <th>Notes / Review</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTeam.students.map((student) => (
//               <tr key={student.id}>
//                 {/* Student Name */}
//                 <td className="student-name-cell">
//                   <div className="student-avatar">
//                     {student.name.charAt(0)}
//                   </div>
//                   <span>{student.name}</span>
//                 </td>

//                 {/* Enrollment */}
//                 <td className="enrollment-cell">
//                   {student.enrollment}
//                 </td>

//                 {/* Attendance */}
//                 <td className="attendance-cell">
//                   <label className="attendance-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={student.attendance}
//                       onChange={(e) => handleAttendanceChange(currentTeam.id, student.id, e.target.checked)}
//                     />
//                     <span className={student.attendance ? 'status-present' : 'status-absent'}>
//                       {student.attendance ? '✓ Present' : '✗ Absent'}
//                     </span>
//                   </label>
//                 </td>

//                 {/* Milestone */}
//                 <td className="milestone-cell">
//                   <div className="milestone-info">
//                     <div className="milestone-text">
//                       <strong>{student.milestone}</strong>
//                       <span className="weight-badge">Weight: {student.weight}</span>
//                     </div>
//                     <label className="milestone-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={student.milestoneCompleted}
//                         onChange={(e) => handleMilestoneChange(currentTeam.id, student.id, e.target.checked)}
//                       />
//                       <span>{student.milestoneCompleted ? 'Completed' : 'Mark Complete'}</span>
//                     </label>
//                   </div>
//                 </td>

//                 {/* Notes */}
//                 <td className="notes-cell">
//                   <textarea
//                     placeholder="Add notes or review..."
//                     value={student.notes}
//                     onChange={(e) => handleNotesChange(currentTeam.id, student.id, e.target.value)}
//                     rows="2"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Submit Button */}
//       <div className="submit-section">
//         <button className="submit-btn" onClick={handleSubmit}>
//           <i className='bx bx-check-circle'></i>
//           Submit Attendance
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PresentationAttendance;

// import React, { useState } from 'react';
// import PresentationAttendance from './PresentationAttendance';
// import MeetingAttendance from './MeetingAttendance';
// import '../styles/attendance.css';

// const Attendance = ({ onClose }) => {
//   const [activeTab, setActiveTab] = useState('presentation');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="attendance-page">
//       {/* Close Button - Top Right */}
//       <button className="attendance-close-btn" onClick={onClose}>
//         <i className='bx bx-x'></i>
//       </button>

//       {/* Header Section */}
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
//           <MeetingAttendance />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Attendance;

import React, { useState } from 'react';
import '../styles/presentationAttendance.css';

const PresentationAttendance = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: 'Team Alpha',
      projectTitle: 'AI Chatbot System',
      students: [
        { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001', attendance: false, milestone: 'UI Completed', weight: 10, milestoneCompleted: false, notes: '' },
        { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002', attendance: false, milestone: 'Backend Integration', weight: 15, milestoneCompleted: false, notes: '' },
        { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003', attendance: false, milestone: 'Database Setup', weight: 12, milestoneCompleted: false, notes: '' },
        { id: 4, name: 'Priya Desai', enrollment: '0827CS211004', attendance: false, milestone: 'API Development', weight: 15, milestoneCompleted: false, notes: '' },
        { id: 5, name: 'Karan Singh', enrollment: '0827CS211005', attendance: false, milestone: 'Testing', weight: 8, milestoneCompleted: false, notes: '' }
      ]
    },
    {
      id: 2,
      teamName: 'Team Beta',
      projectTitle: 'E-Commerce Platform',
      students: [
        { id: 6, name: 'Pooja Sharma', enrollment: '0827CS211006', attendance: false, milestone: 'Frontend Design', weight: 10, milestoneCompleted: false, notes: '' },
        { id: 7, name: 'Kunal Mehta', enrollment: '0827CS211007', attendance: false, milestone: 'Cart System', weight: 12, milestoneCompleted: false, notes: '' },
        { id: 8, name: 'Meera Patel', enrollment: '0827CS211008', attendance: false, milestone: 'Payment Gateway', weight: 15, milestoneCompleted: false, notes: '' }
      ]
    },
    {
      id: 3,
      teamName: 'Team Gamma',
      projectTitle: 'IoT Smart Home',
      students: [
        { id: 9, name: 'Nikhil Rao', enrollment: '0827CS211009', attendance: false, milestone: 'Sensor Integration', weight: 15, milestoneCompleted: false, notes: '' },
        { id: 10, name: 'Vivek Kumar', enrollment: '0827CS211010', attendance: false, milestone: 'Mobile App', weight: 12, milestoneCompleted: false, notes: '' },
        { id: 11, name: 'Divya Singh', enrollment: '0827CS211011', attendance: false, milestone: 'Cloud Setup', weight: 10, milestoneCompleted: false, notes: '' }
      ]
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

  const handleAttendanceChange = (teamId, studentId, value) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          students: team.students.map(student =>
            student.id === studentId ? { ...student, attendance: value } : student
          )
        };
      }
      return team;
    }));
  };

  const handleMilestoneChange = (teamId, studentId, value) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          students: team.students.map(student =>
            student.id === studentId ? { ...student, milestoneCompleted: value } : student
          )
        };
      }
      return team;
    }));
  };

  const handleNotesChange = (teamId, studentId, value) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          students: team.students.map(student =>
            student.id === studentId ? { ...student, notes: value } : student
          )
        };
      }
      return team;
    }));
  };

  const handleSubmit = () => {
    const currentTeam = teams.find(t => t.id === selectedTeam);
    const attendanceData = {
      teamId: currentTeam.id,
      teamName: currentTeam.teamName,
      students: currentTeam.students.map(s => ({
        studentId: s.id,
        name: s.name,
        enrollment: s.enrollment,
        attendance: s.attendance ? 'Present' : 'Absent',
        milestone: s.milestone,
        milestoneCompleted: s.milestoneCompleted,
        notes: s.notes
      }))
    };
    console.log('Submitting attendance data:', attendanceData);
    alert(`Attendance submitted for ${currentTeam.teamName}!\nCheck console for details.`);
  };

  const currentTeam = teams.find(t => t.id === selectedTeam);

  return (
    <div className="presentation-attendance-container">

      {/* Team Selector */}
      <div className="team-selector">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(Number(e.target.value))}
          className="team-select"
        >
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.teamName} - {team.projectTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Team Info */}
      <div className="team-info-card">
        <div>
          <h3>{currentTeam.teamName}</h3>
          <p>{currentTeam.projectTitle}</p>
        </div>
        <span className="student-count">
          {currentTeam.students.length} Students
        </span>
      </div>

      {/* Attendance Table */}
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
            {currentTeam.students.map((student) => (
              <tr key={student.id}>
                {/* Student Name */}
                <td className="student-name-cell">
                  <div className="student-avatar">
                    {student.name.charAt(0)}
                  </div>
                  <span>{student.name}</span>
                </td>

                {/* Enrollment */}
                <td className="enrollment-cell">
                  {student.enrollment}
                </td>

                {/* Attendance */}
                <td className="attendance-cell">
                  <label className="attendance-checkbox">
                    <input
                      type="checkbox"
                      checked={student.attendance}
                      onChange={(e) => handleAttendanceChange(currentTeam.id, student.id, e.target.checked)}
                    />
                    <span className={student.attendance ? 'status-present' : 'status-absent'}>
                      {student.attendance ? '✓ Present' : '✗ Absent'}
                    </span>
                  </label>
                </td>

                {/* Milestone */}
                <td className="milestone-cell">
                  <div className="milestone-info">
                    <div className="milestone-text">
                      <strong>{student.milestone}</strong>
                      <span className="weight-badge">Weight: {student.weight}</span>
                    </div>
                    <label className="milestone-checkbox">
                      <input
                        type="checkbox"
                        checked={student.milestoneCompleted}
                        onChange={(e) => handleMilestoneChange(currentTeam.id, student.id, e.target.checked)}
                      />
                      <span>{student.milestoneCompleted ? 'Completed' : 'Mark Complete'}</span>
                    </label>
                  </div>
                </td>

                {/* Notes */}
                <td className="notes-cell">
                  <textarea
                    placeholder="Add notes or review..."
                    value={student.notes}
                    onChange={(e) => handleNotesChange(currentTeam.id, student.id, e.target.value)}
                    rows="2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          <i className='bx bx-check-circle'></i>
          Submit Attendance
        </button>
      </div>
    </div>
  );
};

export default PresentationAttendance;
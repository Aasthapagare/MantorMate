// import React, { useState } from 'react';
// import '../styles/meetingAttendance.css';

// const MeetingAttendance = () => {
//   const [teams, setTeams] = useState([
//     {
//       id: 1,
//       teamName: 'Team Alpha',
//       projectTitle: 'AI Chatbot System',
//       students: [
//         { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001' },
//         { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002' },
//         { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003' },
//         { id: 4, name: 'Priya Desai', enrollment: '0827CS211004' },
//         { id: 5, name: 'Karan Singh', enrollment: '0827CS211005' }
//       ]
//     },
//     {
//       id: 2,
//       teamName: 'Team Beta',
//       projectTitle: 'E-Commerce Platform',
//       students: [
//         { id: 6, name: 'Pooja Sharma', enrollment: '0827CS211006' },
//         { id: 7, name: 'Kunal Mehta', enrollment: '0827CS211007' },
//         { id: 8, name: 'Meera Patel', enrollment: '0827CS211008' }
//       ]
//     },
//     {
//       id: 3,
//       teamName: 'Team Gamma',
//       projectTitle: 'IoT Smart Home',
//       students: [
//         { id: 9, name: 'Nikhil Rao', enrollment: '0827CS211009' },
//         { id: 10, name: 'Vivek Kumar', enrollment: '0827CS211010' },
//         { id: 11, name: 'Divya Singh', enrollment: '0827CS211011' }
//       ]
//     }
//   ]);

//   const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

//   const [rows, setRows] = useState([
//     { id: 1, studentId: '', date: '', mode: '', notes: '' }
//   ]);

//   const currentTeam = teams.find(t => t.id === selectedTeam);

//   const handleTeamChange = (teamId) => {
//     setSelectedTeam(Number(teamId));
//     setRows([{ id: 1, studentId: '', date: '', mode: '', notes: '' }]);
//   };

//   const handleRowChange = (rowId, field, value) => {
//     setRows(rows.map(row =>
//       row.id === rowId ? { ...row, [field]: value } : row
//     ));
//   };

//   const handleAddRow = () => {
//     const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
//     setRows([...rows, { id: newId, studentId: '', date: '', mode: '', notes: '' }]);
//   };

//   const handleRemoveRow = (rowId) => {
//     if (rows.length === 1) return;
//     setRows(rows.filter(row => row.id !== rowId));
//   };

//   const handleSubmit = () => {
//     const meetingData = {
//       teamId: currentTeam.id,
//       teamName: currentTeam.teamName,
//       entries: rows.map(row => ({
//         studentName: currentTeam.students.find(s => s.id === Number(row.studentId))?.name || '',
//         date: row.date,
//         mode: row.mode,
//         notes: row.notes
//       }))
//     };
//     console.log('Submitting meeting data:', meetingData);
//     alert(`Meeting marked for ${currentTeam.teamName}!\nCheck console for details.`);
//   };

//   return (
//     <div className="meeting-attendance-container">

//       {/* Team Selector */}
//       <div className="team-selector">
//         <select
//           value={selectedTeam}
//           onChange={(e) => handleTeamChange(e.target.value)}
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
//         <div>
//           <h3>{currentTeam.teamName}</h3>
//           <p>{currentTeam.projectTitle}</p>
//         </div>
//         <span className="student-count">
//           {currentTeam.students.length} Students
//         </span>
//       </div>

//       {/* Meeting Table */}
//       <div className="attendance-table-wrapper">
//         <table className="attendance-table meeting-table">
//           <colgroup>
//             <col />
//             <col />
//             <col />
//             <col />
//             <col />
//           </colgroup>
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Date</th>
//               <th>Mode</th>
//               <th>Notes</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => (
//               <tr key={row.id}>

//                 {/* Student Name Dropdown */}
//                 <td className="meeting-cell">
//                   <select
//                     value={row.studentId}
//                     onChange={(e) => handleRowChange(row.id, 'studentId', e.target.value)}
//                     className="meeting-select"
//                   >
//                     <option value="">Select Student</option>
//                     {currentTeam.students.map(student => (
//                       <option key={student.id} value={student.id}>
//                         {student.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 {/* Date */}
//                 <td className="meeting-cell">
//                   <input
//                     type="date"
//                     value={row.date}
//                     onChange={(e) => handleRowChange(row.id, 'date', e.target.value)}
//                     className="meeting-date-input"
//                   />
//                 </td>

//                 {/* Mode */}
//                 <td className="meeting-cell">
//                   <select
//                     value={row.mode}
//                     onChange={(e) => handleRowChange(row.id, 'mode', e.target.value)}
//                     className="meeting-select meeting-mode-select"
//                   >
//                     <option value="">Select Mode</option>
//                     <option value="Online">Online</option>
//                     <option value="Offline">Offline</option>
//                   </select>
//                 </td>

//                 {/* Notes */}
//                 <td className="notes-cell">
//                   <textarea
//                     placeholder="e.g. Discussion about backend integration"
//                     value={row.notes}
//                     onChange={(e) => handleRowChange(row.id, 'notes', e.target.value)}
//                     rows="2"
//                   />
//                 </td>

//                 {/* Remove Row */}
//                 <td className="meeting-action-cell">
//                   <button
//                     className="remove-row-btn"
//                     onClick={() => handleRemoveRow(row.id)}
//                     disabled={rows.length === 1}
//                     title="Remove row"
//                   >
//                     <i className="bx bx-trash"></i>
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Row + Submit */}
//       <div className="meeting-footer">
//         <button className="add-row-btn" onClick={handleAddRow}>
//           <i className="bx bx-plus"></i>
//           Add Row
//         </button>
//         <button className="submit-btn" onClick={handleSubmit}>
//           <i className="bx bx-check-circle"></i>
//           Mark Meeting
//         </button>
//       </div>

//     </div>
//   );
// };

// export default MeetingAttendance;

import React, { useState } from 'react';
import '../styles/meetingAttendance.css';

const MeetingAttendance = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: 'Team Alpha',
      projectTitle: 'AI Chatbot System',
      students: [
        { id: 1, name: 'Arjun Verma', enrollment: '0827CS211001' },
        { id: 2, name: 'Sneha Reddy', enrollment: '0827CS211002' },
        { id: 3, name: 'Rahul Joshi', enrollment: '0827CS211003' },
        { id: 4, name: 'Priya Desai', enrollment: '0827CS211004' },
        { id: 5, name: 'Karan Singh', enrollment: '0827CS211005' }
      ]
    },
    {
      id: 2,
      teamName: 'Team Beta',
      projectTitle: 'E-Commerce Platform',
      students: [
        { id: 6, name: 'Pooja Sharma', enrollment: '0827CS211006' },
        { id: 7, name: 'Kunal Mehta', enrollment: '0827CS211007' },
        { id: 8, name: 'Meera Patel', enrollment: '0827CS211008' }
      ]
    },
    {
      id: 3,
      teamName: 'Team Gamma',
      projectTitle: 'IoT Smart Home',
      students: [
        { id: 9, name: 'Nikhil Rao', enrollment: '0827CS211009' },
        { id: 10, name: 'Vivek Kumar', enrollment: '0827CS211010' },
        { id: 11, name: 'Divya Singh', enrollment: '0827CS211011' }
      ]
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

  const [rows, setRows] = useState([
    { id: 1, studentId: '', date: '', mode: '', notes: '' }
  ]);

  const currentTeam = teams.find(t => t.id === selectedTeam);

  const handleTeamChange = (teamId) => {
    setSelectedTeam(Number(teamId));
    setRows([{ id: 1, studentId: '', date: '', mode: '', notes: '' }]);
  };

  const handleRowChange = (rowId, field, value) => {
    setRows(rows.map(row =>
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  const handleAddRow = () => {
    const newId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: newId, studentId: '', date: '', mode: '', notes: '' }]);
  };

  const handleRemoveRow = (rowId) => {
    if (rows.length === 1) return;
    setRows(rows.filter(row => row.id !== rowId));
  };

  const handleSubmit = () => {
    const meetingData = {
      teamId: currentTeam.id,
      teamName: currentTeam.teamName,
      entries: rows.map(row => ({
        studentName: currentTeam.students.find(s => s.id === Number(row.studentId))?.name || '',
        date: row.date,
        mode: row.mode,
        notes: row.notes
      }))
    };
    console.log('Submitting meeting data:', meetingData);
    alert(`Meeting marked for ${currentTeam.teamName}!\nCheck console for details.`);
  };

  return (
    <div className="meeting-attendance-container">

      {/* Team Selector */}
      <div className="team-selector">
        <select
          value={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
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

      {/* Meeting Table */}
      <div className="attendance-table-wrapper">
        <table className="attendance-table meeting-table">
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
              <th>Date</th>
              <th>Mode</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>

                {/* Student Name Dropdown */}
                <td className="meeting-cell">
                  <select
                    value={row.studentId}
                    onChange={(e) => handleRowChange(row.id, 'studentId', e.target.value)}
                    className="meeting-select"
                  >
                    <option value="">Select Student</option>
                    {currentTeam.students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Date */}
                <td className="meeting-cell">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => handleRowChange(row.id, 'date', e.target.value)}
                    className="meeting-date-input"
                  />
                </td>

                {/* Mode */}
                <td className="meeting-cell">
                  <select
                    value={row.mode}
                    onChange={(e) => handleRowChange(row.id, 'mode', e.target.value)}
                    className="meeting-select meeting-mode-select"
                  >
                    <option value="">Select Mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </td>

                {/* Notes */}
                <td className="notes-cell">
                  <textarea
                    placeholder="e.g. Discussion about backend integration"
                    value={row.notes}
                    onChange={(e) => handleRowChange(row.id, 'notes', e.target.value)}
                    rows="2"
                  />
                </td>

                {/* Remove Row */}
                <td className="meeting-action-cell">
                  <button
                    className="remove-row-btn"
                    onClick={() => handleRemoveRow(row.id)}
                    disabled={rows.length === 1}
                    title="Remove row"
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Row + Submit */}
      <div className="meeting-footer">
        <button className="add-row-btn" onClick={handleAddRow}>
          <i className="bx bx-plus"></i>
          Add Row
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          <i className="bx bx-check-circle"></i>
          Mark Meeting
        </button>
      </div>

    </div>
  );
};

export default MeetingAttendance;
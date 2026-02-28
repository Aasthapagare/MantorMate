import {
  getStudents,
  getFaculty,
  deleteStudent,
  deleteFaculty,
  uploadFile
} from "../services/adminService";

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';


const AdminPanel = ({ userRole, username, onLogout, onNavigate }) => {

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    console.log("AdminPanel: Retrieved role from localStorage:", role);

    if (!role || role.toUpperCase() !== "ADMIN") {
      alert("Access Denied");
      window.location.href = "/login";
    }
  }, []);

  const [theme, setTheme] = useState('default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [attendance, setAttendance] = useState([]); // kept for existing UI
  const [projects, setProjects] = useState([]);     // kept for existing UI

  // Apply theme on mount and when it changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Fetch students and faculty on mount
  useEffect(() => {
    fetchStudents();
    fetchFaculty();
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeDropdown(false);
  };

  const handleFileUpload = async (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    await uploadFile(file, type);
    alert(`${type} uploaded successfully`);

    if (type === "Students") fetchStudents();
    else fetchFaculty();
  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};
  const fetchStudents = async () => {
  try {
    const data = await getStudents();
    setStudents(data);
  } catch (error) {
    console.error("Failed fetching students", error);
  }
};

const fetchFaculty = async () => {
  try {
    const data = await getFaculty();
    setFaculty(data);
  } catch (error) {
    console.error("Failed fetching faculty", error);
  }
};

  const handleDeleteStudent = async (rollNo) => {
    if (!window.confirm('Delete student ' + rollNo + '?')) return;
    try {
     await deleteStudent(rollNo);
      fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFaculty = async (employeeId) => {
    if (!window.confirm('Delete faculty ' + employeeId + '?')) return;
    try {
      await deleteFaculty(employeeId);
      fetchFaculty();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminHomeClick = () => {
    setActiveSection('dashboard');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContent = document.querySelector('.dashboard-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderDashboard = () => (
    <div className="admin-dashboard-cards">
      <div className="admin-card" onClick={() => setActiveSection('students')}>
        <div className="admin-card-icon">
          <i className='bx bx-group'></i>
        </div>
        <h3 className="admin-card-title">Students Management</h3>
        <p className="admin-card-count">{students.length} Students</p>
      </div>
      <div className="admin-card" onClick={() => setActiveSection('faculty')}>
        <div className="admin-card-icon">
          <i className='bx bx-user-circle'></i>
        </div>
        <h3 className="admin-card-title">Faculty Management</h3>
        <p className="admin-card-count">{faculty.length} Faculty Members</p>
      </div>
      <div className="admin-card" onClick={() => setActiveSection('attendance')}>
        <div className="admin-card-icon">
          <i className='bx bx-calendar-check'></i>
        </div>
        <h3 className="admin-card-title">Student Attendance</h3>
        <p className="admin-card-count">View Records</p>
      </div>
      <div className="admin-card" onClick={() => setActiveSection('projects')}>
        <div className="admin-card-icon">
          <i className='bx bx-folder-open'></i>
        </div>
        <h3 className="admin-card-title">Project Submissions</h3>
        <p className="admin-card-count">{projects.length} Projects</p>
      </div>
    </div>
  );

  const renderStudentsManagement = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Students Management</h2>
        <div className="admin-actions">
          <label htmlFor="student-upload" className="upload-btn">
            <i className='bx bx-refresh'></i> Update Students List
          </label>
          <input 
            type="file" 
            id="student-upload"
            accept=".csv,.xlsx"
            onChange={(e) => handleFileUpload(e, 'Students')}
            style={{ display: 'none' }}
          />
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}>
            <i className='bx bx-arrow-back'></i> Back
          </button>
        </div>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment No.</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.enrollment || student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.enrollment || student.rollNo}</td>
                <td>{student.branch}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStudent(student.enrollment || student.rollNo)}
                  >
                    <i className='bx bx-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFacultyManagement = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Faculty Management</h2>
        <div className="admin-actions">
          <label htmlFor="faculty-upload" className="upload-btn">
            <i className='bx bx-refresh'></i> Update Faculty List
          </label>
          <input 
            type="file" 
            id="faculty-upload"
            accept=".csv,.xlsx"
            onChange={(e) => handleFileUpload(e, 'Faculty')}
            style={{ display: 'none' }}
          />
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}>
            <i className='bx bx-arrow-back'></i> Back
          </button>
        </div>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Expertise</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((member, index) => (
              <tr key={member.employeeId || member.id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.department}</td>
                <td>{member.expertise}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFaculty(member.employeeId || member.id)}
                  >
                    <i className='bx bx-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Student Attendance</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}>
          <i className='bx bx-arrow-back'></i> Back
        </button>
      </div>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Enrollment No.</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Total Classes</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.enrollment}</td>
                <td className="attendance-present">{record.present}</td>
                <td className="attendance-absent">{record.absent}</td>
                <td>{record.total}</td>
                <td>
                  <span className={`percentage-badge ${record.present >= 75 ? 'good' : 'low'}`}>
                    {((record.present / record.total) * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Project Submissions</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}>
          <i className='bx bx-arrow-back'></i> Back
        </button>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <i className='bx bx-file'></i>
              <span className={`status-badge ${project.status.toLowerCase()}`}>
                {project.status}
              </span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <div className="project-details">
              <p><strong>Student:</strong> {project.student}</p>
              <p><strong>Enrollment:</strong> {project.enrollment}</p>
              <p><strong>Submitted:</strong> {project.date}</p>
            </div>
            <button className="view-project-btn">
              <i className='bx bx-show'></i> View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle">
                <i className='bx bxs-graduation'></i>
              </div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button 
                className="theme-btn"
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                <i className='bx bx-palette'></i>
                <span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <button 
                    className={theme === 'light' ? 'active' : ''}
                    onClick={() => handleThemeChange('light')}
                  >
                    <i className='bx bx-sun'></i> Light
                  </button>
                  <button 
                    className={theme === 'dark' ? 'active' : ''}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <i className='bx bx-moon'></i> Dark
                  </button>
                  <button 
                    className={theme === 'default' ? 'active' : ''}
                    onClick={() => handleThemeChange('default')}
                  >
                    <i className='bx bx-brush'></i> Default
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          <Sidebar 
            userRole={userRole} 
            username={username}
            onLogout={onLogout}
            onNavigate={onNavigate}
            onSearchToggle={() => {}}
            onAdminHomeClick={handleAdminHomeClick}
            isAdminPanel={true}
          />

          <main className="dashboard-content">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection === 'students' && renderStudentsManagement()}
            {activeSection === 'faculty' && renderFacultyManagement()}
            {activeSection === 'attendance' && renderAttendance()}
            {activeSection === 'projects' && renderProjects()}
            </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

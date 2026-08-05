import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminProfilePage from './AdminProfilePage';
import AboutPage from './AboutPage';

const AdminPanel = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAdminProfile, setShowAdminProfile] = useState(false);
  const [showAdminAbout, setShowAdminAbout] = useState(false);

  const stats = {
    totalStudents: 24, totalGuides: 8, totalTeams: 6, totalProjects: 6,
    upcomingPresentations: 3, pendingGuideAllocations: 2,
    completionRate: 68, avgProgress: 61, pendingIdeaApprovals: 4,
  };

  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Alpha', project: 'AI Chatbot System', domain: 'AI & ML', guide: 'Dr. Rajesh Kumar', progress: 70, status: 'Active', selectedGuides: ['Dr. Rajesh Kumar', 'Dr. Vikram Singh'] },
    { id: 2, name: 'Team Beta', project: 'IoT Home Automation', domain: 'IoT', guide: 'Prof. Anjali Sharma', progress: 45, status: 'Active', selectedGuides: ['Prof. Anjali Sharma', 'Dr. Vikram Singh'] },
    { id: 3, name: 'Team Gamma', project: 'E-Commerce Platform', domain: 'Web Development', guide: null, progress: 30, status: 'Pending Allocation', selectedGuides: ['Prof. Priya Mehta', 'Dr. Vikram Singh'] },
    { id: 4, name: 'Team Delta', project: 'Blockchain Voting', domain: 'Blockchain', guide: null, progress: 20, status: 'Pending Allocation', selectedGuides: ['Dr. Vikram Singh', 'Dr. Rajesh Kumar'] },
    { id: 5, name: 'Team Epsilon', project: 'ML Stock Predictor', domain: 'AI & ML', guide: 'Dr. Rajesh Kumar', progress: 85, status: 'Active', selectedGuides: ['Dr. Rajesh Kumar', 'Prof. Anjali Sharma'] },
    { id: 6, name: 'Team Zeta', project: 'Cybersecurity Tool', domain: 'Cybersecurity', guide: 'Dr. Amit Patel', progress: 55, status: 'Active', selectedGuides: ['Dr. Amit Patel', 'Dr. Vikram Singh'] },
  ]);

  const guides = [
    { id: 1, name: 'Dr. Rajesh Kumar', expertise: 'AI & ML', projects: 2, pendingReviews: 3, availability: 'Limited' },
    { id: 2, name: 'Prof. Anjali Sharma', expertise: 'IoT', projects: 1, pendingReviews: 1, availability: 'Available' },
    { id: 3, name: 'Dr. Vikram Singh', expertise: 'Robotics', projects: 0, pendingReviews: 0, availability: 'Available' },
    { id: 4, name: 'Prof. Priya Mehta', expertise: 'Web Development', projects: 1, pendingReviews: 2, availability: 'Available' },
    { id: 5, name: 'Dr. Amit Patel', expertise: 'Cybersecurity', projects: 1, pendingReviews: 1, availability: 'Limited' },
  ];

  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Proposal Submission', weightage: 10, rubrics: [{ name: 'Documentation', marks: 5 }, { name: 'Presentation', marks: 5 }], deadline: '2026-02-15' },
    { id: 2, name: 'Requirement Analysis', weightage: 10, rubrics: [{ name: 'Completeness', marks: 5 }, { name: 'Clarity', marks: 5 }], deadline: '2026-03-01' },
    { id: 3, name: 'Design Phase', weightage: 15, rubrics: [{ name: 'UI/UX', marks: 8 }, { name: 'Architecture', marks: 7 }], deadline: '2026-03-20' },
    { id: 4, name: 'Development', weightage: 25, rubrics: [{ name: 'Functionality', marks: 15 }, { name: 'Code Quality', marks: 10 }], deadline: '2026-04-30' },
    { id: 5, name: 'Testing', weightage: 20, rubrics: [{ name: 'Test Coverage', marks: 10 }, { name: 'Bug Resolution', marks: 10 }], deadline: '2026-05-15' },
    { id: 6, name: 'Final Presentation', weightage: 20, rubrics: [{ name: 'Demo', marks: 10 }, { name: 'Viva', marks: 10 }], deadline: '2026-05-30' },
  ]);

  const [presentations, setPresentations] = useState([
    { id: 1, team: 'Team Alpha', milestone: 'Design Phase', date: '2026-03-22', time: '10:00 AM', venue: 'Lab 101', status: 'Scheduled', reminder: false },
    { id: 2, team: 'Team Epsilon', milestone: 'Development', date: '2026-04-05', time: '02:00 PM', venue: 'Seminar Hall', status: 'Scheduled', reminder: false },
    { id: 3, team: 'Team Zeta', milestone: 'Testing', date: '2026-05-18', time: '11:00 AM', venue: 'Lab 202', status: 'Upcoming', reminder: false },
  ]);

  const [attendance, setAttendance] = useState([
    { id: 1,  student: 'Arjun Verma',    team: 'Team Alpha',   type: 'Presentation',  date: '2026-03-22', status: 'Present' },
    { id: 2,  student: 'Sneha Reddy',    team: 'Team Alpha',   type: 'Presentation',  date: '2026-03-22', status: 'Present' },
    { id: 3,  student: 'Rahul Joshi',    team: 'Team Alpha',   type: 'Presentation',  date: '2026-03-22', status: 'Absent' },
    { id: 4,  student: 'Priya Desai',    team: 'Team Alpha',   type: 'Presentation',  date: '2026-03-22', status: 'Present' },
    { id: 5,  student: 'Karan Singh',    team: 'Team Alpha',   type: 'Presentation',  date: '2026-03-22', status: 'Present' },
    { id: 6,  student: 'Arjun Verma',    team: 'Team Alpha',   type: 'Meeting',       date: '2026-03-20', status: 'Present' },
    { id: 7,  student: 'Sneha Reddy',    team: 'Team Alpha',   type: 'Meeting',       date: '2026-03-20', status: 'Absent' },
    { id: 8,  student: 'Rahul Joshi',    team: 'Team Alpha',   type: 'Meeting',       date: '2026-03-20', status: 'Present' },
    { id: 9,  student: 'Pooja Sharma',   team: 'Team Beta',    type: 'Presentation',  date: '2026-03-23', status: 'Present' },
    { id: 10, student: 'Kunal Mehta',    team: 'Team Beta',    type: 'Presentation',  date: '2026-03-23', status: 'Absent' },
    { id: 11, student: 'Meera Patel',    team: 'Team Beta',    type: 'Presentation',  date: '2026-03-23', status: 'Present' },
    { id: 12, student: 'Pooja Sharma',   team: 'Team Beta',    type: 'Meeting',       date: '2026-03-21', status: 'Present' },
    { id: 13, student: 'Kunal Mehta',    team: 'Team Beta',    type: 'Meeting',       date: '2026-03-21', status: 'Present' },
    { id: 14, student: 'Nikhil Rao',     team: 'Team Gamma',   type: 'Presentation',  date: '2026-03-24', status: 'Absent' },
    { id: 15, student: 'Vivek Kumar',    team: 'Team Gamma',   type: 'Presentation',  date: '2026-03-24', status: 'Present' },
    { id: 16, student: 'Divya Singh',    team: 'Team Gamma',   type: 'Presentation',  date: '2026-03-24', status: 'Present' },
    { id: 17, student: 'Nikhil Rao',     team: 'Team Gamma',   type: 'Meeting',       date: '2026-03-19', status: 'Present' },
    { id: 18, student: 'Vivek Kumar',    team: 'Team Gamma',   type: 'Meeting',       date: '2026-03-19', status: 'Absent' },
  ]);

  const [selectedAttGroup, setSelectedAttGroup] = useState('Team Alpha');
  const [attTypeFilter, setAttTypeFilter] = useState('all');
  const [attSessionFilter, setAttSessionFilter] = useState('all');

  const pendingIdeas = [
    { id: 1, title: 'AI-based Resume Screener', student: 'Arjun Verma', domain: 'AI & ML', submitted: '2026-03-10' },
    { id: 2, title: 'Smart Parking System', student: 'Sneha Reddy', domain: 'IoT', submitted: '2026-03-12' },
    { id: 3, title: 'Decentralized Finance App', student: 'Rahul Joshi', domain: 'Blockchain', submitted: '2026-03-14' },
    { id: 4, title: 'Cloud Cost Optimizer', student: 'Priya Desai', domain: 'Cloud Computing', submitted: '2026-03-15' },
  ];

  const [selectedTeamForGuide, setSelectedTeamForGuide] = useState('');
  const [selectedGuideForAlloc, setSelectedGuideForAlloc] = useState('');
  const [inlineAlloc, setInlineAlloc] = useState({});
  const [newMilestone, setNewMilestone] = useState({ name: '', weightage: '', deadline: '' });
  const [newPresentation, setNewPresentation] = useState({ presentationNo: '', date: '', milestoneName: '', milestoneWeight: '' });
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showPresentationForm, setShowPresentationForm] = useState(false);

  const handleThemeChange = (t) => {
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
    setShowThemeDropdown(false);
  };

  const getProgressColor = (p) => p >= 75 ? '#27ae60' : p >= 50 ? '#f39c12' : '#e74c3c';
  const getAvailColor = (a) => a === 'Available' ? '#27ae60' : a === 'Limited' ? '#f39c12' : '#e74c3c';

  const suggestGuide = (domain) => {
    const map = { 'AI & ML': 'Dr. Rajesh Kumar', 'IoT': 'Prof. Anjali Sharma', 'Robotics': 'Dr. Vikram Singh', 'Web Development': 'Prof. Priya Mehta', 'Cybersecurity': 'Dr. Amit Patel', 'Blockchain': 'Dr. Vikram Singh', 'Cloud Computing': 'Prof. Priya Mehta' };
    return map[domain] || '';
  };

  const handleAllocateGuide = () => {
    if (!selectedTeamForGuide || !selectedGuideForAlloc) return;
    setTeams(prev => prev.map(t => t.name === selectedTeamForGuide ? { ...t, guide: selectedGuideForAlloc, status: 'Active' } : t));
    setSelectedTeamForGuide(''); setSelectedGuideForAlloc('');
  };

  const handleInlineAllocate = (teamId) => {
    const chosen = inlineAlloc[teamId];
    if (!chosen) return;
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, guide: chosen, status: 'Active' } : t));
    setInlineAlloc(prev => ({ ...prev, [teamId]: '' }));
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.name || !newMilestone.weightage) return;
    setMilestones(prev => [...prev, { id: Date.now(), ...newMilestone, rubrics: [] }]);
    setNewMilestone({ name: '', weightage: '', deadline: '' });
    setShowMilestoneForm(false);
  };

  const handleAddPresentation = (e) => {
    e.preventDefault();
    if (!newPresentation.presentationNo || !newPresentation.date) return;
    setPresentations(prev => [...prev.sort((a,b) => new Date(a.date) - new Date(b.date)), { id: Date.now(), ...newPresentation, status: 'Scheduled', reminder: false }].sort((a,b) => new Date(a.date) - new Date(b.date)));
    setNewPresentation({ presentationNo: '', date: '', milestoneName: '', milestoneWeight: '' });
    setShowPresentationForm(false);
  };
  const toggleReminder = (id) => setPresentations(prev => prev.map(p => p.id === id ? { ...p, reminder: !p.reminder } : p));
  const toggleAttendance = (id) => setAttendance(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Present' ? 'Absent' : 'Present' } : a));
  const totalWeightage = milestones.reduce((s, m) => s + Number(m.weightage), 0);

  // ── SECTIONS ──────────────────────────────────────────────────────────────

  const renderDashboard = () => (
    <div className="admin-overview">
      <div className="stats-grid">
        {[
          { icon: 'bx-group', label: 'Total Students', value: stats.totalStudents, color: '#3498db', bg: 'rgba(52,152,219,0.12)' },
          { icon: 'bx-user-check', label: 'Total Guides', value: stats.totalGuides, color: '#9b59b6', bg: 'rgba(155,89,182,0.12)' },
          { icon: 'bx-layer', label: 'Total Teams', value: stats.totalTeams, color: '#1abc9c', bg: 'rgba(26,188,156,0.12)' },
          { icon: 'bx-briefcase', label: 'Total Projects', value: stats.totalProjects, color: '#e67e22', bg: 'rgba(230,126,34,0.12)' },
          { icon: 'bx-calendar-event', label: 'Upcoming Presentations', value: stats.upcomingPresentations, color: '#e74c3c', bg: 'rgba(231,76,60,0.12)' },
          { icon: 'bx-user-plus', label: 'Pending Allocations', value: stats.pendingGuideAllocations, color: '#f39c12', bg: 'rgba(243,156,18,0.12)' },
          { icon: 'bx-bulb', label: 'Pending Idea Approvals', value: stats.pendingIdeaApprovals, color: '#2ecc71', bg: 'rgba(46,204,113,0.12)' },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon-box" style={{ background: s.bg }}>
              <i className={`bx ${s.icon}`} style={{ color: s.color }}></i>
            </div>
            <div className="stat-info">
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-header"><i className='bx bx-pie-chart-alt-2'></i><span>Completion Rate</span></div>
          <div className="donut-wrap">
            <svg viewBox="0 0 100 100" className="donut-svg">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--bg-primary)" strokeWidth="10" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#27ae60" strokeWidth="10"
                strokeDasharray={`${stats.completionRate * 2.39} ${(100 - stats.completionRate) * 2.39}`}
                strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <span className="donut-label">{stats.completionRate}%</span>
          </div>
          <p className="metric-sub">projects on track</p>
        </div>

        <div className="metric-card">
          <div className="metric-header"><i className='bx bx-trending-up'></i><span>Avg Team Progress</span></div>
          <div className="donut-wrap">
            <svg viewBox="0 0 100 100" className="donut-svg">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--bg-primary)" strokeWidth="10" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#3498db" strokeWidth="10"
                strokeDasharray={`${stats.avgProgress * 2.39} ${(100 - stats.avgProgress) * 2.39}`}
                strokeLinecap="round" transform="rotate(-90 50 50)" />
            </svg>
            <span className="donut-label">{stats.avgProgress}%</span>
          </div>
          <p className="metric-sub">across all teams</p>
        </div>

        <div className="quick-nav-grid">
          {[
            { icon: 'bx-user-plus', label: 'Guide Allocation', section: 'guideAllocation', color: '#9b59b6' },
            { icon: 'bx-calendar-check', label: 'Presentations', section: 'presentations', color: '#e74c3c' },
            { icon: 'bx-check-square', label: 'Attendance', section: 'attendance', color: '#1abc9c' },
          ].map((n, i) => (
            <div className="quick-nav-card" key={i} onClick={() => setActiveSection(n.section)}>
              <i className={`bx ${n.icon}`} style={{ color: n.color }}></i>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-block">
        <div className="section-block-header">
          <h3><i className='bx bx-bar-chart-alt-2'></i> Team Progress Overview</h3>
          <button className="view-all-btn" onClick={() => setActiveSection('progress')}>View All</button>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Team</th><th>Project</th><th>Guide</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              {teams.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.project}</td>
                  <td>{t.guide || <span className="badge-pending">Unassigned</span>}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-track"><div className="progress-fill" style={{ width: `${t.progress}%`, background: getProgressColor(t.progress) }}></div></div>
                      <span style={{ color: getProgressColor(t.progress), fontWeight: 700 }}>{t.progress}%</span>
                    </div>
                  </td>
                  <td><span className={`status-pill ${t.status === 'Active' ? 'active' : 'pending'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-block">
        <div className="section-block-header"><h3><i className='bx bx-bulb'></i> Pending Idea Approvals</h3></div>
        <div className="ideas-grid">
          {pendingIdeas.map(idea => (
            <div className="idea-card" key={idea.id}>
              <div className="idea-top"><span className="idea-domain">{idea.domain}</span><span className="badge-pending">Pending</span></div>
              <h4 className="idea-title">{idea.title}</h4>
              <p className="idea-student"><i className='bx bx-user'></i> {idea.student}</p>
              <p className="idea-date"><i className='bx bx-calendar'></i> {idea.submitted}</p>
              <div className="idea-actions">
                <button className="idea-btn approve">Approve</button>
                <button className="idea-btn reject">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGuideAllocation = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title"><i className="bx bx-user-plus"></i> Guide Allocation</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className="bx bx-arrow-back"></i> Back</button>
      </div>
      <div className="section-block">
        <h3 className="sub-section-title">All Groups & Guide Allocation</h3>
        <div className="admin-table-container" style={{ overflowX: 'auto' }}>
          <table className="admin-table" style={{ minWidth: '900px', tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Project Title</th>
                <th>Selected Guides</th>
                <th>Allocated Guide</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td>
                  <td style={{ wordBreak: 'break-word' }}>{t.project}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {(t.selectedGuides || []).map((g, i) => (
                        <span key={i} className="domain-tag" style={{ fontSize: '0.77rem', whiteSpace: 'nowrap' }}>{g}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {t.guide
                      ? <span className="status-pill active" style={{ whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '0.78rem' }}>{t.guide}</span>
                      : <span className="badge-pending">Not Allocated</span>
                    }
                  </td>
                  <td>
                    <span className={`status-pill ${t.status === 'Active' ? 'active' : 'pending'}`} style={{ fontSize: '0.78rem' }}>{t.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <select
                        className="alloc-inline-select"
                        style={{ minWidth: '0', width: '100%', flex: 1 }}
                        value={inlineAlloc[t.id] || ''}
                        onChange={e => setInlineAlloc(prev => ({ ...prev, [t.id]: e.target.value }))}
                      >
                        <option value="">{t.guide ? 'Reassign...' : 'Select Guide'}</option>
                        {guides.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                      </select>
                      <button
                        className={t.guide ? 'toggle-att-btn' : 'alloc-btn'}
                        style={{ padding: '0.45rem 0.7rem', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                        onClick={() => handleInlineAllocate(t.id)}
                      >
                        <i className={`bx ${t.guide ? 'bx-check' : 'bx-check-circle'}`}></i>
                        {t.guide ? '' : ' Allocate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  const renderPresentations = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title"><i className="bx bx-calendar-event"></i> Presentation Schedule</h2>
        <div className="admin-actions">
          <button className="upload-btn" onClick={() => setShowPresentationForm(!showPresentationForm)}><i className="bx bx-plus"></i> Add Schedule</button>
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className="bx bx-arrow-back"></i> Back</button>
        </div>
      </div>

      {showPresentationForm && (
        <div className="inline-form-card">
          <h4>Add Presentation Schedule</h4>
          <form onSubmit={handleAddPresentation} className="inline-form">
            <div className="form-field">
              <label>Presentation No. *</label>
              <input type="number" min="1" placeholder="e.g. 1" value={newPresentation.presentationNo} onChange={e => setNewPresentation({ ...newPresentation, presentationNo: e.target.value })} required />
            </div>
            <div className="form-field">
              <label>Date *</label>
              <input type="date" value={newPresentation.date} onChange={e => setNewPresentation({ ...newPresentation, date: e.target.value })} required />
            </div>
            <div className="form-field">
              <label>Milestone Name</label>
              <input type="text" placeholder="e.g. Design Phase" value={newPresentation.milestoneName} onChange={e => setNewPresentation({ ...newPresentation, milestoneName: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Milestone Weight</label>
              <input type="number" min="0" max="100" placeholder="e.g. 20" value={newPresentation.milestoneWeight} onChange={e => setNewPresentation({ ...newPresentation, milestoneWeight: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="upload-btn"><i className="bx bx-save"></i> Add Schedule</button>
              <button type="button" className="back-btn" onClick={() => setShowPresentationForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="section-block" style={{ marginTop: '1.5rem' }}>
        <h3 className="sub-section-title">All Schedules</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Presentation No.</th>
                <th>Date</th>
                <th>Milestone</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...presentations].sort((a,b) => new Date(a.date) - new Date(b.date)).map((p, idx) => (
                <tr key={p.id}>
                  <td><strong>{p.presentationNo || idx + 1}</strong></td>
                  <td>{p.date}</td>
                  <td>{p.milestoneName || p.milestone || <span className="badge-pending">—</span>}</td>
                  <td>{p.milestoneWeight ? <span className="domain-tag">{p.milestoneWeight}%</span> : <span className="badge-pending">—</span>}</td>
                  <td><span className={`status-pill ${p.status === 'Scheduled' ? 'active' : 'pending'}`}>{p.status}</span></td>
                  <td>
                    <button className="toggle-att-btn" onClick={() => setPresentations(prev => prev.filter(x => x.id !== p.id))}>
                      <i className="bx bx-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  const renderAttendance = () => {
    const groupNames = [...new Set(attendance.map(a => a.team))].sort();
    const groupAtt = attendance.filter(a => a.team === selectedAttGroup);

    // Unique presentation sessions for this group (by date)
    const presDates = [...new Set(
      groupAtt.filter(a => a.type === 'Presentation').map(a => a.date)
    )].sort();

    // Unique meeting sessions for this group (by date)
    const meetDates = [...new Set(
      groupAtt.filter(a => a.type === 'Meeting').map(a => a.date)
    )].sort();

    // Filtered records based on type + session
    let filtered = groupAtt;
    if (attTypeFilter === 'Presentation') {
      filtered = groupAtt.filter(a => a.type === 'Presentation');
      if (attSessionFilter !== 'all') {
        filtered = filtered.filter(a => a.date === attSessionFilter);
      }
    } else if (attTypeFilter === 'Meeting') {
      filtered = groupAtt.filter(a => a.type === 'Meeting');
      if (attSessionFilter !== 'all') {
        filtered = filtered.filter(a => a.date === attSessionFilter);
      }
    }

    const presentCount = filtered.filter(a => a.status === 'Present').length;
    const absentCount  = filtered.filter(a => a.status === 'Absent').length;
    const rate = filtered.length ? Math.round((presentCount / filtered.length) * 100) : 0;

    // When type changes, reset session filter
    const handleTypeChange = (val) => {
      setAttTypeFilter(val);
      setAttSessionFilter('all');
    };

    return (
      <div className="admin-section">
        <div className="section-header-admin">
          <h2 className="section-title"><i className="bx bx-check-square"></i> Attendance System</h2>
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className="bx bx-arrow-back"></i> Back</button>
        </div>

        {/* Filter Bar */}
        <div className="alloc-form-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
          <div className="alloc-form-row" style={{ alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>

            {/* Group */}
            <div className="alloc-field">
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>Group</label>
              <select
                className="alloc-inline-select"
                style={{ minWidth: '180px' }}
                value={selectedAttGroup}
                onChange={e => { setSelectedAttGroup(e.target.value); setAttTypeFilter('all'); setAttSessionFilter('all'); }}
              >
                {groupNames.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Type */}
            <div className="alloc-field">
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>Type</label>
              <select
                className="alloc-inline-select"
                style={{ minWidth: '160px' }}
                value={attTypeFilter}
                onChange={e => handleTypeChange(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Presentation">Presentation</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>

            {/* Session — only shown when a type is selected */}
            {attTypeFilter !== 'all' && (
              <div className="alloc-field">
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.35rem' }}>
                  {attTypeFilter === 'Presentation' ? 'Presentation Date' : 'Meeting Date'}
                </label>
                <select
                  className="alloc-inline-select"
                  style={{ minWidth: '180px' }}
                  value={attSessionFilter}
                  onChange={e => setAttSessionFilter(e.target.value)}
                >
                  <option value="all">All Sessions</option>
                  {(attTypeFilter === 'Presentation' ? presDates : meetDates).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="attendance-summary" style={{ marginBottom: '1.5rem' }}>
          <div className="att-summary-card present">
            <i className="bx bx-check-circle"></i>
            <span>{presentCount}</span>
            <p>Present</p>
          </div>
          <div className="att-summary-card absent">
            <i className="bx bx-x-circle"></i>
            <span>{absentCount}</span>
            <p>Absent</p>
          </div>
          <div className="att-summary-card rate">
            <i className="bx bx-bar-chart"></i>
            <span>{rate}%</span>
            <p>Rate</p>
          </div>
        </div>

        {/* Table */}
        {filtered.length > 0 ? (
          <div className="section-block">
            <h3 className="sub-section-title">
              {attTypeFilter === 'all' ? 'All Records' : attTypeFilter} Attendance
              {attSessionFilter !== 'all' && <span className="domain-tag" style={{ marginLeft: '0.75rem', fontSize: '0.8rem' }}>{attSessionFilter}</span>}
            </h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Team</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(a => (
                    <tr key={a.id}>
                      <td><strong>{a.student}</strong></td>
                      <td>{a.team}</td>
                      <td><span className="type-tag">{a.type}</span></td>
                      <td>{a.date}</td>
                      <td><span className={`status-pill ${a.status === 'Present' ? 'active' : 'absent'}`}>{a.status}</span></td>
                      <td><button className="toggle-att-btn" onClick={() => toggleAttendance(a.id)}><i className="bx bx-transfer"></i> Toggle</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="section-block" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)' }}>
            <i className="bx bx-calendar-x" style={{ fontSize: '2.5rem', opacity: 0.3, display: 'block', marginBottom: '1rem' }}></i>
            <p style={{ margin: 0 }}>No records found for selected filters</p>
          </div>
        )}
      </div>
    );
  };

  const renderProgress = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title"><i className='bx bx-trending-up'></i> Progress Monitoring</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
      </div>
      <div className="progress-chart-card">
        <h3 className="chart-title"><i className='bx bx-bar-chart-alt'></i> Team Progress Chart</h3>
        <div className="bar-chart">
          {teams.map(t => (
            <div className="bar-item" key={t.id}>
              <div className="bar-label">{t.name}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${t.progress}%`, background: getProgressColor(t.progress) }}>
                  <span className="bar-value">{t.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <span className="legend-item good"><i className='bx bx-circle'></i> On Track (≥75%)</span>
          <span className="legend-item warn"><i className='bx bx-circle'></i> Moderate (50–74%)</span>
          <span className="legend-item slow"><i className='bx bx-circle'></i> Slow (&lt;50%)</span>
        </div>
      </div>
      {teams.filter(t => t.progress < 50).length > 0 && (
        <div className="slow-teams-alert">
          <i className='bx bx-error-circle'></i>
          <strong>Attention:</strong> {teams.filter(t => t.progress < 50).map(t => t.name).join(', ')} — below 50%. Review needed.
        </div>
      )}
      <div className="section-block">
        <h3 className="sub-section-title">Milestone Phase per Team</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Team</th><th>Project</th><th>Progress</th><th>Guide</th><th>Current Phase</th></tr></thead>
            <tbody>
              {teams.map(t => {
                const phase = t.progress >= 80 ? 'Testing' : t.progress >= 60 ? 'Development' : t.progress >= 40 ? 'Design Phase' : t.progress >= 20 ? 'Requirement Analysis' : 'Proposal';
                return (
                  <tr key={t.id}>
                    <td><strong>{t.name}</strong></td><td>{t.project}</td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-track"><div className="progress-fill" style={{ width: `${t.progress}%`, background: getProgressColor(t.progress) }}></div></div>
                        <span style={{ color: getProgressColor(t.progress), fontWeight: 700 }}>{t.progress}%</span>
                      </div>
                    </td>
                    <td>{t.guide || <span className="badge-pending">Unassigned</span>}</td>
                    <td><span className="phase-tag">{phase}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGuideMonitoring = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title"><i className='bx bx-user-circle'></i> Guide Monitoring</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
      </div>
      <div className="guide-cards-grid">
        {guides.map(g => (
          <div className="guide-monitor-card" key={g.id}>
            <div className="guide-monitor-top">
              <div className="guide-avatar-lg"><i className='bx bx-user-circle'></i></div>
              <div><h4 className="guide-monitor-name">{g.name}</h4><span className="domain-tag">{g.expertise}</span></div>
              <span className="avail-badge" style={{ background: `${getAvailColor(g.availability)}22`, color: getAvailColor(g.availability) }}>{g.availability}</span>
            </div>
            <div className="guide-monitor-stats">
              <div className="gm-stat"><i className='bx bx-briefcase'></i><div><p className="gm-val">{g.projects}</p><p className="gm-key">Projects</p></div></div>
              <div className="gm-stat"><i className='bx bx-time-five'></i><div><p className="gm-val" style={{ color: g.pendingReviews > 2 ? '#e74c3c' : '#f39c12' }}>{g.pendingReviews}</p><p className="gm-key">Pending Reviews</p></div></div>
            </div>
          </div>
        ))}
      </div>
      <div className="section-block" style={{ marginTop: '2rem' }}>
        <h3 className="sub-section-title">Guide Summary Table</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Guide</th><th>Expertise</th><th>Projects</th><th>Pending Reviews</th><th>Availability</th></tr></thead>
            <tbody>
              {guides.map(g => (
                <tr key={g.id}>
                  <td><strong>{g.name}</strong></td>
                  <td><span className="domain-tag">{g.expertise}</span></td>
                  <td>{g.projects}</td>
                  <td><span style={{ color: g.pendingReviews > 2 ? '#e74c3c' : '#f39c12', fontWeight: 700 }}>{g.pendingReviews}</span></td>
                  <td><span className="avail-badge" style={{ background: `${getAvailColor(g.availability)}22`, color: getAvailColor(g.availability) }}>{g.availability}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Students Management</h2>
        <div className="admin-actions">
          <label htmlFor="student-upload" className="upload-btn"><i className='bx bx-refresh'></i> Update List</label>
          <input type="file" id="student-upload" accept=".csv,.xlsx" style={{ display: 'none' }} />
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>S.No</th><th>Name</th><th>Email</th><th>Enrollment No.</th><th>Branch</th></tr></thead>
          <tbody>
            {[
              { id: 1, name: 'Arjun Verma', email: 'arjun@example.com', enrollment: '2021CS001', branch: 'Computer Science' },
              { id: 2, name: 'Sneha Reddy', email: 'sneha@example.com', enrollment: '2021IT002', branch: 'Information Technology' },
              { id: 3, name: 'Rahul Joshi', email: 'rahul@example.com', enrollment: '2021EC003', branch: 'Electronics' },
            ].map((s, i) => <tr key={s.id}><td>{i + 1}</td><td>{s.name}</td><td>{s.email}</td><td>{s.enrollment}</td><td>{s.branch}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFaculty = () => (
    <div className="admin-section">
      <div className="section-header-admin">
        <h2 className="section-title">Faculty Management</h2>
        <div className="admin-actions">
          <label htmlFor="faculty-upload" className="upload-btn"><i className='bx bx-refresh'></i> Update List</label>
          <input type="file" id="faculty-upload" accept=".csv,.xlsx" style={{ display: 'none' }} />
          <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
        </div>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>S.No</th><th>Name</th><th>Department</th><th>Expertise</th><th>Availability</th></tr></thead>
          <tbody>
            {guides.map((g, i) => <tr key={g.id}><td>{i + 1}</td><td>{g.name}</td><td>Engineering</td><td>{g.expertise}</td><td><span className="avail-badge" style={{ background: `${getAvailColor(g.availability)}22`, color: getAvailColor(g.availability) }}>{g.availability}</span></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const sectionMap = {
    dashboard: renderDashboard, guideAllocation: renderGuideAllocation,
    presentations: renderPresentations,
    attendance: renderAttendance, progress: renderProgress,
    guideMonitoring: renderGuideMonitoring, students: renderStudents, faculty: renderFaculty,
  };

  const handleAboutBack = () => { setShowAdminProfile(false); setShowAdminAbout(false); };

  const handleAdminNavigate = (page) => {
    if (page === 'about') {
      setShowAdminAbout(true);
    } else if (page === 'profile') {
      setShowAdminProfile(true);
    } else {
      setShowAdminProfile(false);
      setShowAdminAbout(false);
      if (onNavigate) onNavigate(page);
    }
  };

  // Show Admin About Page
  if (showAdminAbout) {
    return (
      <AboutPage
        userRole={userRole}
        username={username}
        onLogout={onLogout}
        onNavigate={handleAdminNavigate}
        SidebarComponent={Sidebar}
        sidebarProps={{
          userRole, username,
          onLogout,
          onNavigate: handleAdminNavigate,
          onSearchToggle: () => {},
          onAdminHomeClick: () => { setShowAdminAbout(false); setActiveSection('dashboard'); },
          isAdminPanel: true,
          currentPage: 'about'
        }}
      />
    );
  }

  // Show Admin Profile Page
  if (showAdminProfile) {
    return (
      <AdminProfilePage
        userRole={userRole}
        username={username}
        onLogout={onLogout}
        onNavigate={handleAdminNavigate}
        onAdminHomeClick={() => { setShowAdminProfile(false); setActiveSection('dashboard'); }}
      />
    );
  }


  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      <div className="dashboard-wrapper">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo-circle"><i className='bx bxs-graduation'></i></div>
              <h1 className="project-name">MentorMate</h1>
            </div>
          </div>
          <div className="header-center">
            <span className="admin-badge"><i className='bx bx-shield'></i> Admin Panel</span>
          </div>
          <div className="header-right">
            <div className="theme-selector">
              <button className="theme-btn" onClick={() => setShowThemeDropdown(!showThemeDropdown)}>
                <i className='bx bx-palette'></i><span>Theme</span>
              </button>
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  {['light', 'dark', 'default'].map(t => (
                    <button key={t} className={theme === t ? 'active' : ''} onClick={() => handleThemeChange(t)}>
                      <i className={`bx bx-${t === 'light' ? 'sun' : t === 'dark' ? 'moon' : 'brush'}`}></i> {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          <Sidebar userRole={userRole} username={username} onLogout={onLogout} onNavigate={handleAdminNavigate}
            onSearchToggle={() => {}} onAdminHomeClick={() => { setShowAdminProfile(false); setActiveSection('dashboard'); }} isAdminPanel={true} />

          <main className="dashboard-content">
            <div className="admin-nav-tabs">
              {[
                { id: 'dashboard', icon: 'bx-home', label: 'Overview' },
                { id: 'guideAllocation', icon: 'bx-user-plus', label: 'Guide Allocation' },
                { id: 'presentations', icon: 'bx-calendar-event', label: 'Presentations' },
                { id: 'attendance', icon: 'bx-check-square', label: 'Attendance' },
                { id: 'progress', icon: 'bx-trending-up', label: 'Progress' },
                { id: 'guideMonitoring', icon: 'bx-user-circle', label: 'Guides' },
                { id: 'students', icon: 'bx-group', label: 'Students' },
                { id: 'faculty', icon: 'bx-chalkboard', label: 'Faculty' },
              ].map(tab => (
                <button key={tab.id} className={`admin-tab-btn ${activeSection === tab.id ? 'active' : ''}`} onClick={() => setActiveSection(tab.id)}>
                  <i className={`bx ${tab.icon}`}></i><span>{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="admin-main-content">
              {(sectionMap[activeSection] || renderDashboard)()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
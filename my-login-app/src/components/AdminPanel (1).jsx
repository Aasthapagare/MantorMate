import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminProfilePage from './AdminProfilePage';
import { allocateGuideToGroup, createPresentationSchedule, deletePresentationSchedule, getGroupGuideAllocations, getPresentationSchedules, getStoredGuides, getStoredStudents } from '../services/adminService';

const AdminPanel = ({ userRole, username, onLogout, onNavigate }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAdminProfile, setShowAdminProfile] = useState(false);

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

  const [presentations, setPresentations] = useState([]);

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
  const [allocationGroups, setAllocationGroups] = useState([]);
  const [allocationLoading, setAllocationLoading] = useState(true);
  const [allocationError, setAllocationError] = useState('');
  const [allocationMessage, setAllocationMessage] = useState('');
  const [guidesData, setGuidesData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [peopleLoading, setPeopleLoading] = useState(true);
  const [peopleError, setPeopleError] = useState('');
  const [presentationLoading, setPresentationLoading] = useState(true);
  const [presentationError, setPresentationError] = useState('');
  const [presentationMessage, setPresentationMessage] = useState('');
  const [newMilestone, setNewMilestone] = useState({ name: '', weightage: '', deadline: '' });
  const [newPresentation, setNewPresentation] = useState({ presentationNo: '', presentationTitle: '', date: '', milestoneName: '', expectedCompletion: '', milestoneWeight: '' });
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showPresentationForm, setShowPresentationForm] = useState(false);

  const dashboardStats = {
    totalStudents: studentsData.length,
    totalGuides: guidesData.length,
    totalTeams: allocationGroups.length,
    pendingGuideAllocations: allocationGroups.filter((group) => !group.allocatedGuideId).length,
  };

  useEffect(() => {
    loadAllocationGroups();
    loadPresentationSchedules();
    loadPeopleData();
  }, []);

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

  const loadAllocationGroups = async () => {
    try {
      setAllocationLoading(true);
      setAllocationError('');
      const data = await getGroupGuideAllocations();
      setAllocationGroups(Array.isArray(data) ? data : []);
    } catch (error) {
      setAllocationError(error.message || 'Failed to load group guide allocation data');
    } finally {
      setAllocationLoading(false);
    }
  };

  const loadPresentationSchedules = async () => {
    try {
      setPresentationLoading(true);
      setPresentationError('');
      const data = await getPresentationSchedules();
      setPresentations(Array.isArray(data) ? data : []);
    } catch (error) {
      setPresentationError(error.message || 'Failed to load presentation schedules');
    } finally {
      setPresentationLoading(false);
    }
  };

  const loadPeopleData = async () => {
    try {
      setPeopleLoading(true);
      setPeopleError('');
      const [guides, students] = await Promise.all([
        getStoredGuides(),
        getStoredStudents()
      ]);
      setGuidesData(Array.isArray(guides) ? guides : []);
      setStudentsData(Array.isArray(students) ? students : []);
    } catch (error) {
      setPeopleError(error.message || 'Failed to load guide and student information');
    } finally {
      setPeopleLoading(false);
    }
  };

  const handleAllocateGuide = () => {
    if (!selectedTeamForGuide || !selectedGuideForAlloc) return;
    setTeams(prev => prev.map(t => t.name === selectedTeamForGuide ? { ...t, guide: selectedGuideForAlloc, status: 'Active' } : t));
    setSelectedTeamForGuide(''); setSelectedGuideForAlloc('');
  };

  const handleInlineAllocate = async (groupId) => {
    const chosen = inlineAlloc[groupId];
    if (!chosen) return;

    try {
      const message = await allocateGuideToGroup(groupId, chosen);
      setAllocationMessage(message || 'Guide allocated successfully');
      setInlineAlloc(prev => ({ ...prev, [groupId]: '' }));
      await loadAllocationGroups();
    } catch (error) {
      setAllocationError(error.message || 'Failed to allocate guide');
    }
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.name || !newMilestone.weightage) return;
    setMilestones(prev => [...prev, { id: Date.now(), ...newMilestone, rubrics: [] }]);
    setNewMilestone({ name: '', weightage: '', deadline: '' });
    setShowMilestoneForm(false);
  };

  const handleAddPresentation = async (e) => {
    e.preventDefault();
    if (!newPresentation.presentationNo || !newPresentation.presentationTitle || !newPresentation.date || !newPresentation.milestoneName || !newPresentation.expectedCompletion || !newPresentation.milestoneWeight) return;

    try {
      await createPresentationSchedule(newPresentation);
      setPresentationMessage('Presentation schedule saved successfully');
      setPresentationError('');
      setNewPresentation({ presentationNo: '', presentationTitle: '', date: '', milestoneName: '', expectedCompletion: '', milestoneWeight: '' });
      setShowPresentationForm(false);
      await loadPresentationSchedules();
    } catch (error) {
      setPresentationMessage('');
      setPresentationError(error.message || 'Failed to save presentation schedule');
    }
  };
  const toggleReminder = (id) => setPresentations(prev => prev.map(p => p.id === id ? { ...p, reminder: !p.reminder } : p));
  const toggleAttendance = (id) => setAttendance(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'Present' ? 'Absent' : 'Present' } : a));
  const totalWeightage = milestones.reduce((s, m) => s + Number(m.weightage), 0);

  // ── SECTIONS ──────────────────────────────────────────────────────────────

  const renderDashboard = () => (
    <div className="admin-overview">
      <div className="stats-grid">
        {[
          { icon: 'bx-group', label: 'Total Students', value: dashboardStats.totalStudents, color: '#3498db', bg: 'rgba(52,152,219,0.12)' },
          { icon: 'bx-user-check', label: 'Total Guides', value: dashboardStats.totalGuides, color: '#9b59b6', bg: 'rgba(155,89,182,0.12)' },
          { icon: 'bx-layer', label: 'Total Teams', value: dashboardStats.totalTeams, color: '#1abc9c', bg: 'rgba(26,188,156,0.12)' },
          { icon: 'bx-user-plus', label: 'Pending Allocations', value: dashboardStats.pendingGuideAllocations, color: '#f39c12', bg: 'rgba(243,156,18,0.12)' },
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
        <div className="quick-nav-grid" style={{ width: '100%' }}>
          {[
            { icon: 'bx-user-plus', label: 'Guide Allocation', section: 'guideAllocation', color: '#9b59b6' },
            { icon: 'bx-calendar-check', label: 'Presentations', section: 'presentations', color: '#e74c3c' },
            { icon: 'bx-user-circle', label: 'Guides', section: 'guideMonitoring', color: '#1abc9c' },
            { icon: 'bx-group', label: 'Students', section: 'students', color: '#3498db' },
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
          <h3><i className='bx bx-layer'></i> Group Allocation Overview</h3>
          <button className="view-all-btn" onClick={() => setActiveSection('guideAllocation')}>View All</button>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Team</th><th>Project</th><th>Guide</th><th>Selected Guides</th><th>Status</th></tr></thead>
            <tbody>
              {allocationLoading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>Loading groups...</td>
                </tr>
              ) : allocationGroups.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>No groups available.</td>
                </tr>
              ) : allocationGroups.map((group) => (
                <tr key={group.groupId}>
                  <td><strong>{group.groupName}</strong></td>
                  <td>{group.projectTitle || 'Project title not submitted'}</td>
                  <td>{group.allocatedGuideName || <span className="badge-pending">Unassigned</span>}</td>
                  <td>
                    {(group.selectedGuides || []).filter((guide) => guide?.guideId).length > 0
                      ? (group.selectedGuides || [])
                          .filter((guide) => guide?.guideId)
                          .map((guide) => guide.guideName)
                          .join(', ')
                      : <span className="badge-pending">Guides not selected</span>}
                  </td>
                  <td><span className={`status-pill ${group.status === 'Active' ? 'active' : 'pending'}`}>{group.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
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
        {allocationMessage && (
          <div className="result-container success show" style={{ marginBottom: '1rem' }}>
            <strong>{allocationMessage}</strong>
          </div>
        )}
        {allocationError && (
          <div className="result-container error show" style={{ marginBottom: '1rem' }}>
            <strong>{allocationError}</strong>
          </div>
        )}
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
                <th>Selected 2 Guides</th>
                <th>Allocated Guide</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allocationLoading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>Loading groups...</td>
                </tr>
              ) : allocationGroups.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No groups found yet.</td>
                </tr>
              ) : allocationGroups.map(t => {
                const validSelectedGuides = (t.selectedGuides || []).filter(g => g?.guideId);
                const hasInvalidSelectedGuides = (t.selectedGuides || []).some(g => !g?.guideId);

                return (
                <tr key={t.groupId}>
                  <td><strong>{t.groupName}</strong></td>
                  <td style={{ wordBreak: 'break-word' }}>{t.projectTitle || 'Project title not submitted'}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {validSelectedGuides.length > 0 ? (
                        validSelectedGuides.map((g, i) => (
                          <span key={i} className="domain-tag" style={{ fontSize: '0.77rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                            {g.guideName} {g.preferenceOrder ? `(Choice ${g.preferenceOrder})` : ''}
                          </span>
                        ))
                      ) : hasInvalidSelectedGuides ? (
                        <span className="badge-pending">Old invalid guide selection. Please reselect guides.</span>
                      ) : (
                        <span className="badge-pending">Guides not selected</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {t.allocatedGuideName
                      ? <span className="status-pill active" style={{ whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '0.78rem' }}>{t.allocatedGuideName}</span>
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
                        value={inlineAlloc[t.groupId] || ''}
                        onChange={e => {
                          setAllocationError('');
                          setAllocationMessage('');
                          setInlineAlloc(prev => ({ ...prev, [t.groupId]: e.target.value }));
                        }}
                        disabled={validSelectedGuides.length === 0}
                      >
                        <option value="">{t.allocatedGuideName ? 'Reassign...' : 'Select Guide'}</option>
                        {validSelectedGuides.map((g, index) => (
                          <option key={`${g.guideId}-${index}`} value={g.guideId}>{g.guideName}</option>
                        ))}
                      </select>
                      <button
                        className={t.allocatedGuideName ? 'toggle-att-btn' : 'alloc-btn'}
                        style={{ padding: '0.45rem 0.7rem', fontSize: '0.8rem', whiteSpace: 'nowrap', flexShrink: 0 }}
                        onClick={() => handleInlineAllocate(t.groupId)}
                        disabled={!inlineAlloc[t.groupId]}
                      >
                        <i className={`bx ${t.allocatedGuideName ? 'bx-check' : 'bx-check-circle'}`}></i>
                        {t.allocatedGuideName ? '' : ' Allocate'}
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
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

      <div className="section-block" style={{ marginBottom: '1.5rem' }}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-box" style={{ background: 'rgba(52,152,219,0.12)' }}>
              <i className="bx bx-calendar" style={{ color: '#3498db' }}></i>
            </div>
            <div className="stat-info">
              <p className="stat-value">{presentations.length}</p>
              <p className="stat-label">Scheduled Presentations</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-box" style={{ background: 'rgba(46,204,113,0.12)' }}>
              <i className="bx bx-check-shield" style={{ color: '#2ecc71' }}></i>
            </div>
            <div className="stat-info">
              <p className="stat-value">{presentations.filter(p => p.status === 'Scheduled').length}</p>
              <p className="stat-label">Ready To Conduct</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-box" style={{ background: 'rgba(243,156,18,0.12)' }}>
              <i className="bx bx-bar-chart-alt-2" style={{ color: '#f39c12' }}></i>
            </div>
            <div className="stat-info">
              <p className="stat-value">{presentations.reduce((sum, p) => sum + Number(p.milestoneWeight || 0), 0)}%</p>
              <p className="stat-label">Planned Weightage</p>
            </div>
          </div>
        </div>
      </div>

      {presentationMessage && (
        <div className="result-container success show" style={{ marginBottom: '1rem' }}>
          <strong>{presentationMessage}</strong>
        </div>
      )}
      {presentationError && (
        <div className="result-container error show" style={{ marginBottom: '1rem' }}>
          <strong>{presentationError}</strong>
        </div>
      )}

      {showPresentationForm && (
        <div className="inline-form-card">
          <h4>Schedule New Presentation</h4>
          <form onSubmit={handleAddPresentation} className="inline-form">
            <div className="form-field">
              <label>Presentation Number *</label>
              <input type="number" min="1" placeholder="e.g. 1" value={newPresentation.presentationNo} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, presentationNo: e.target.value }); }} required />
            </div>
            <div className="form-field">
              <label>Presentation Title *</label>
              <input type="text" placeholder="e.g. Presentation 1 / Final Presentation" value={newPresentation.presentationTitle} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, presentationTitle: e.target.value }); }} required />
            </div>
            <div className="form-field">
              <label>Presentation Date *</label>
              <input type="date" value={newPresentation.date} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, date: e.target.value }); }} required />
            </div>
            <div className="form-field">
              <label>Milestone To Complete *</label>
              <input type="text" placeholder="e.g. Design Phase" value={newPresentation.milestoneName} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, milestoneName: e.target.value }); }} required />
            </div>
            <div className="form-field">
              <label>What Should Be Completed? *</label>
              <textarea rows="3" placeholder="e.g. module implementation, review deck, testing summary" value={newPresentation.expectedCompletion} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, expectedCompletion: e.target.value }); }} required />
            </div>
            <div className="form-field">
              <label>Milestone Weightage (%) *</label>
              <input type="number" min="0" max="100" placeholder="e.g. 20" value={newPresentation.milestoneWeight} onChange={e => { setPresentationError(''); setPresentationMessage(''); setNewPresentation({ ...newPresentation, milestoneWeight: e.target.value }); }} required />
            </div>
            <div className="form-actions">
              <button type="submit" className="upload-btn"><i className="bx bx-save"></i> Save Schedule</button>
              <button type="button" className="back-btn" onClick={() => setShowPresentationForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="section-block" style={{ marginTop: '1.5rem' }}>
        <h3 className="sub-section-title">Scheduled Presentation Plan</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Presentation No.</th>
                <th>Presentation</th>
                <th>Date</th>
                <th>Milestone To Complete</th>
                <th>Required Completion</th>
                <th>Weightage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {presentationLoading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>Loading schedules...</td>
                </tr>
              ) : presentations.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>No presentation schedules added yet.</td>
                </tr>
              ) : [...presentations].sort((a,b) => new Date(a.date) - new Date(b.date)).map((p, idx) => (
                <tr key={p.id}>
                  <td><strong>{p.presentationNo || idx + 1}</strong></td>
                  <td>{p.presentationTitle || `Presentation ${p.presentationNo || idx + 1}`}</td>
                  <td>{p.date}</td>
                  <td>{p.milestoneName || p.milestone || <span className="badge-pending">-</span>}</td>
                  <td style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: '240px' }}>{p.expectedCompletion || <span className="badge-pending">-</span>}</td>
                  <td>{p.milestoneWeight ? <span className="domain-tag">{p.milestoneWeight}%</span> : <span className="badge-pending">-</span>}</td>
                  <td><span className={`status-pill ${p.status === 'Scheduled' ? 'active' : 'pending'}`}>{p.status}</span></td>
                  <td>
                    <button className="toggle-att-btn" onClick={async () => {
                      try {
                        await deletePresentationSchedule(p.id);
                        setPresentationMessage('Presentation schedule deleted successfully');
                        setPresentationError('');
                        await loadPresentationSchedules();
                      } catch (error) {
                        setPresentationMessage('');
                        setPresentationError(error.message || 'Failed to delete presentation schedule');
                      }
                    }}>
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
        <h2 className="section-title"><i className='bx bx-user-circle'></i> Guide Information</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
      </div>
      {peopleError && <div className="result-container error show" style={{ marginBottom: '1rem' }}><strong>{peopleError}</strong></div>}
      <div className="section-block" style={{ marginTop: '2rem' }}>
        <h3 className="sub-section-title">Guide Summary Table</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead><tr><th>Guide ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>
              {peopleLoading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>Loading guides...</td></tr>
              ) : guidesData.map((g, index) => (
                <tr key={g.userId || index}>
                  <td><strong>{g.userId}</strong></td>
                  <td>{g.name}</td>
                  <td>{g.email || 'N/A'}</td>
                  <td><span className="domain-tag">{g.role || 'GUIDE'}</span></td>
                  <td><span className="avail-badge" style={{ background: '#27ae6022', color: '#27ae60' }}>Active</span></td>
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
        <h2 className="section-title">Student Information</h2>
        <button className="back-btn" onClick={() => setActiveSection('dashboard')}><i className='bx bx-arrow-back'></i> Back</button>
      </div>
      {peopleError && <div className="result-container error show" style={{ marginBottom: '1rem' }}><strong>{peopleError}</strong></div>}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>S.No</th><th>Name</th><th>Email</th><th>Enrollment No.</th><th>Role</th></tr></thead>
          <tbody>
            {peopleLoading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>Loading students...</td></tr>
            ) : studentsData.map((s, i) => <tr key={s.userId || i}><td>{i + 1}</td><td>{s.name}</td><td>{s.email || 'N/A'}</td><td>{s.userId}</td><td>{s.role || 'STUDENT'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );

  const sectionMap = {
    dashboard: renderDashboard, guideAllocation: renderGuideAllocation,
    presentations: renderPresentations,
    attendance: renderAttendance, guideMonitoring: renderGuideMonitoring, students: renderStudents,
  };

  const handleAdminNavigate = (page) => {
    if (page === 'profile') {
      setShowAdminProfile(true);
    } else {
      setShowAdminProfile(false);
      if (sectionMap[page]) {
        setActiveSection(page);
      } else if (page === 'dashboard') {
        setActiveSection('dashboard');
      } else if (onNavigate) {
        onNavigate(page);
      }
    }
  };

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
            onSearchToggle={() => {}} onAdminHomeClick={() => { setShowAdminProfile(false); setActiveSection('dashboard'); }} isAdminPanel={true} currentPage={showAdminProfile ? 'profile' : activeSection} />

          <main className="dashboard-content">
            <div className="admin-nav-tabs">
              {[
                { id: 'dashboard', icon: 'bx-home', label: 'Overview' },
                { id: 'guideAllocation', icon: 'bx-user-plus', label: 'Guide Allocation' },
                { id: 'presentations', icon: 'bx-calendar-event', label: 'Presentations' },
                { id: 'guideMonitoring', icon: 'bx-user-circle', label: 'Guides' },
                { id: 'students', icon: 'bx-group', label: 'Students' },
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

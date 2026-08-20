// MentorMate - Project Management Frontend JavaScript

// Base URL for API calls - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8080';

// ==================== Navigation Functions ====================

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the clicked nav button
    const navButtons = document.querySelectorAll('.nav-btn');
    if (sectionId === 'dashboard') {
        navButtons[0].classList.add('active');
    } else if (sectionId === 'student') {
        navButtons[1].classList.add('active');
    } else if (sectionId === 'guide') {
        navButtons[2].classList.add('active');
    }
}

function showStudentTab(tabId) {
    // Check if trying to access manage-group without project submission
    if (tabId === 'manage-group') {
        const submittedProject = localStorage.getItem('submittedProject');
        if (!submittedProject) {
            showToast('Please submit a project first before managing group members', 'error');
            return;
        }
    }

    // Hide all student tabs
    document.querySelectorAll('#student .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update tab buttons
    const tabs = document.querySelectorAll('#student .tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the clicked tab button
    const tabNames = ['create-group', 'manage-group', 'submit-project', 'documents', 'project-status'];
    const index = tabNames.indexOf(tabId);
    if (index !== -1) {
        tabs[index].classList.add('active');
    }
}

function showGuideTab(tabId) {
    // Hide all guide tabs
    document.querySelectorAll('#guide .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update tab buttons
    const tabs = document.querySelectorAll('#guide .tab-btn');
    tabs.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the clicked tab button
    const tabNames = ['view-projects', 'approve-project', 'progress-update', 'add-remarks'];
    const index = tabNames.indexOf(tabId);
    if (index !== -1) {
        tabs[index].classList.add('active');
    }
}

function logout() {
    showSection('dashboard');
    showToast('Logged out successfully', 'info');
}

// ==================== Toast Notifications ====================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showResult(containerId, message, type = 'info') {
    const container = document.getElementById(containerId);
    container.className = `result-container ${type} show`;
    container.innerHTML = `<strong>${message}</strong>`;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        container.classList.remove('show');
    }, 5000);
}

// ==================== API Helper Functions ====================

async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ==================== Student Functions ====================

// Create Group
document.getElementById('createGroupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const groupName = document.getElementById('groupName').value;
    const leaderId = document.getElementById('leaderId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('name', groupName);
        formData.append('leaderId', leaderId);
        
        const response = await fetch(`${API_BASE_URL}/api/students/create-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const group = await response.json();
            showResult('createGroupResult', `Group created successfully! Group ID: ${group.id}`, 'success');
            e.target.reset();
        } else {
            showResult('createGroupResult', 'Failed to create group', 'error');
        }
    } catch (error) {
        showResult('createGroupResult', `Error: ${error.message}`, 'error');
    }
});

// Add Member
document.getElementById('addMemberForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const request = {
        groupId: parseInt(document.getElementById('addGroupId').value),
        studentId: parseInt(document.getElementById('memberStudentId').value),
        leaderId: parseInt(document.getElementById('addLeaderId').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/students/add-member`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        
        if (response.ok) {
            const group = await response.json();
            showResult('manageGroupResult', `Member added successfully to group: ${group.name}`, 'success');
            e.target.reset();
        } else {
            showResult('manageGroupResult', 'Failed to add member', 'error');
        }
    } catch (error) {
        showResult('manageGroupResult', `Error: ${error.message}`, 'error');
    }
});

// Remove Member
document.getElementById('removeMemberForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const request = {
        groupId: parseInt(document.getElementById('removeGroupId').value),
        studentId: parseInt(document.getElementById('removeStudentId').value),
        leaderId: parseInt(document.getElementById('removeLeaderId').value)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/students/remove-member`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        
        if (response.ok) {
            const group = await response.json();
            showResult('manageGroupResult', `Member removed successfully from group: ${group.name}`, 'success');
            e.target.reset();
        } else {
            showResult('manageGroupResult', 'Failed to remove member', 'error');
        }
    } catch (error) {
        showResult('manageGroupResult', `Error: ${error.message}`, 'error');
    }
});

// Choose Guide
document.getElementById('chooseGuideForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('guideProjectId').value;
    const guideId = document.getElementById('guideId').value;
    const studentId = document.getElementById('guideStudentId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('projectId', projectId);
        formData.append('guideId', guideId);
        formData.append('studentId', studentId);
        
        const response = await fetch(`${API_BASE_URL}/api/students/choose-guide`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const project = await response.json();
            showResult('manageGroupResult', `Guide chosen successfully! Project: ${project.title}`, 'success');
            e.target.reset();
        } else {
            showResult('manageGroupResult', 'Failed to choose guide', 'error');
        }
    } catch (error) {
        showResult('manageGroupResult', `Error: ${error.message}`, 'error');
    }
});

// Submit Project
document.getElementById('submitProjectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const groupId = document.getElementById('projectGroupId').value;
    const studentId = document.getElementById('projectStudentId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('groupId', groupId);
        formData.append('studentId', studentId);
        
        const response = await fetch(`${API_BASE_URL}/api/students/submit-project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const project = await response.json();
            showResult('submitProjectResult', `Project submitted successfully! Project ID: ${project.id}`, 'success');
            
            // Save project submission status to localStorage
            localStorage.setItem('submittedProject', 'true');
            
            e.target.reset();
        } else {
            showResult('submitProjectResult', 'Failed to submit project', 'error');
        }
    } catch (error) {
        showResult('submitProjectResult', `Error: ${error.message}`, 'error');
    }
});

// Upload Document
document.getElementById('uploadDocumentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('docProjectId').value;
    const name = document.getElementById('docName').value;
    const type = document.getElementById('docType').value;
    const file = document.getElementById('docFile').files[0];
    const studentId = document.getElementById('docStudentId').value;
    
    if (!file) {
        showToast('Please select a file', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('file', file);
    formData.append('studentId', studentId);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/students/upload-document`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const doc = await response.json();
            showResult('documentsResult', `Document uploaded successfully! Document ID: ${doc.id}`, 'success');
            e.target.reset();
        } else {
            showResult('documentsResult', 'Failed to upload document', 'error');
        }
    } catch (error) {
        showResult('documentsResult', `Error: ${error.message}`, 'error');
    }
});

// View Project Status
document.getElementById('viewProjectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('viewProjectId').value;
    const studentId = document.getElementById('viewStudentId').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/students/project/${projectId}?studentId=${studentId}`);
        
        if (response.ok) {
            const project = await response.json();
            const resultContainer = document.getElementById('projectStatusResult');
            resultContainer.className = 'result-container info show';
            resultContainer.innerHTML = `
                <h4>Project Details</h4>
                <p><strong>Title:</strong> ${project.title}</p>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${project.status}">${project.status}</span></p>
                <p><strong>Submitted:</strong> ${new Date(project.submittedAt).toLocaleDateString()}</p>
                ${project.guide ? `<p><strong>Guide:</strong> ${project.guide.name}</p>` : '<p><strong>Guide:</strong> Not assigned</p>'}
            `;
        } else {
            showResult('projectStatusResult', 'Failed to fetch project status', 'error');
        }
    } catch (error) {
        showResult('projectStatusResult', `Error: ${error.message}`, 'error');
    }
});

// ==================== Guide Functions ====================

// View Assigned Projects
document.getElementById('viewAssignedProjectsForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const guideId = document.getElementById('guideIdView').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/guides/projects/${guideId}`);
        
        if (response.ok) {
            const projects = await response.json();
            const resultContainer = document.getElementById('assignedProjectsResult');
            
            if (projects.length === 0) {
                resultContainer.className = 'result-container info show';
                resultContainer.innerHTML = '<p>No projects assigned to you yet.</p>';
            } else {
                resultContainer.className = 'result-container info show';
                let html = '<div class="project-list">';
                
                projects.forEach(project => {
                    html += `
                        <div class="project-item">
                            <h4>${project.title}</h4>
                            <p><strong>Description:</strong> ${project.description}</p>
                            <p><strong>Group:</strong> ${project.projectGroup?.name || 'N/A'}</p>
                            <p><strong>Status:</strong> <span class="status-badge status-${project.status}">${project.status}</span></p>
                            <p><strong>Submitted:</strong> ${new Date(project.submittedAt).toLocaleDateString()}</p>
                        </div>
                    `;
                });
                
                html += '</div>';
                resultContainer.innerHTML = html;
            }
        } else {
            showResult('assignedProjectsResult', 'Failed to fetch projects', 'error');
        }
    } catch (error) {
        showResult('assignedProjectsResult', `Error: ${error.message}`, 'error');
    }
});

// Approve/Reject Project
document.getElementById('approveRejectForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('approveProjectId').value;
    const status = document.getElementById('projectStatus').value;
    const remarks = document.getElementById('approveRemarks').value;
    const guideId = document.getElementById('approveGuideId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('projectId', projectId);
        formData.append('status', status);
        formData.append('remarks', remarks);
        formData.append('guideId', guideId);
        
        const response = await fetch(`${API_BASE_URL}/api/guides/approve-reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const project = await response.json();
            showResult('approveRejectResult', `Project ${project.status} successfully!`, 'success');
            e.target.reset();
        } else {
            showResult('approveRejectResult', 'Failed to update project status', 'error');
        }
    } catch (error) {
        showResult('approveRejectResult', `Error: ${error.message}`, 'error');
    }
});

// Update Progress
document.getElementById('progressUpdateForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('progressProjectId').value;
    const update = document.getElementById('progressUpdate').value;
    const guideId = document.getElementById('progressGuideId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('projectId', projectId);
        formData.append('update', update);
        formData.append('guideId', guideId);
        
        const response = await fetch(`${API_BASE_URL}/api/guides/update-progress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const progress = await response.json();
            showResult('progressUpdateResult', `Progress updated successfully!`, 'success');
            e.target.reset();
        } else {
            showResult('progressUpdateResult', 'Failed to update progress', 'error');
        }
    } catch (error) {
        showResult('progressUpdateResult', `Error: ${error.message}`, 'error');
    }
});

// Add Remarks
document.getElementById('addRemarksForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectId = document.getElementById('remarksProjectId').value;
    const remarks = document.getElementById('remarksText').value;
    const guideId = document.getElementById('remarksGuideId').value;
    
    try {
        const formData = new URLSearchParams();
        formData.append('projectId', projectId);
        formData.append('remarks', remarks);
        formData.append('guideId', guideId);
        
        const response = await fetch(`${API_BASE_URL}/api/guides/add-remarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        
        if (response.ok) {
            const progress = await response.json();
            showResult('addRemarksResult', `Remarks added successfully!`, 'success');
            e.target.reset();
        } else {
            showResult('addRemarksResult', 'Failed to add remarks', 'error');
        }
    } catch (error) {
        showResult('addRemarksResult', `Error: ${error.message}`, 'error');
    }
});

// ==================== Initialize App ====================

// Show dashboard by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');
    console.log('MentorMate Frontend Initialized');
});


import React from 'react';

const TaskTable = () => {
  const tasks = [
    { id: 1, task: 'Project Documentation', timeline: '2 days left', progress: 75 },
    { id: 2, task: 'Code Review Session', timeline: '5 days left', progress: 40 },
    { id: 3, task: 'Meeting with Guide', timeline: 'Tomorrow', progress: 90 },
    { id: 4, task: 'Submit Proposal', timeline: '1 week left', progress: 60 },
    { id: 5, task: 'Research Phase', timeline: '3 days left', progress: 50 },
    { id: 6, task: 'Design Mockups', timeline: '4 days left', progress: 30 }
  ];

  return (
    <div className="task-table-section">
      <h2 className="section-title">Your Tasks</h2>
      
      <div className="task-table-container">
        <div className="task-table-header">
          <div className="task-col">Task</div>
          <div className="timeline-col">Timeline</div>
          <div className="progress-col">Progress</div>
        </div>
        
        <div className="task-table-body">
          {tasks.map(task => (
            <div key={task.id} className="task-row">
              <div className="task-col">
                <i className='bx bx-task'></i>
                <span>{task.task}</span>
              </div>
              <div className="timeline-col">
                <i className='bx bx-time'></i>
                <span>{task.timeline}</span>
              </div>
              <div className="progress-col">
                <div className="progress-bar-wrapper">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${task.progress}%` }}
                  >
                    <span className="progress-text">{task.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
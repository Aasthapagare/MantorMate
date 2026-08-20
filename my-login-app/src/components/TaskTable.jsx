import React, { useEffect, useState } from "react";
import { getMilestones } from "../services/progressApi";
import ProjectStatus from "./ProjectStatus";

const TaskTable = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const data = await getMilestones();

      const formatted = data.map((m, index) => ({
  id: index,
  task: m.name,        // milestone name
  timeline: m.status,  // Completed / Pending
  progress: m.progress // actual %
}));
      setTasks(formatted);

    } catch (error) {
      console.error("Error loading milestones", error);
    }
  };

  return (
    <div className="task-table-section">

      <h2 className="section-title">Milestones</h2>

      <div className="task-table-container">

        <div className="task-table-header">
          <div className="task-col">Milestone</div>
          <div className="timeline-col">Status</div>
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
                {task.timeline}
              </div>

              <div className="progress-col">

                <div className="progress-bar-wrapper">

                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.round(task.progress)}%` }}
                  >

                    <span className="progress-text">
                      {Math.round(task.progress)}%
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ProjectStatus />

    </div>
  );
};

export default TaskTable;

import React, { useEffect, useState } from "react";
import "../styles/projectStatus.css";
import { getProgress } from "../services/progressApi";

const formatPercent = (value) => `${Math.round(value || 0)}%`;

const getProgressTone = (value) => {
  if (value >= 75) {
    return "strong";
  }

  if (value >= 40) {
    return "steady";
  }

  return "early";
};

const ProjectStatus = () => {
  console.log("ProjectStatus component loaded");

  const [progress, setProgress] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
  fetchProgress();
}, []);

const fetchProgress = async () => {
  try {
    const data = await getProgress();
    setProgress(data);
  } catch (error) {
    console.error(error);
  }
};

  if (!progress) return <p>Loading...</p>;

  const detailItems = [
    { label: "Presentation Attendance", value: progress.presentations, key: "presentations" },
    { label: "Meeting Attendance", value: progress.meetings, key: "meetings" },
    { label: "Milestone Progress", value: progress.milestones, key: "milestones" }
  ];

  return (
  <div className="project-status-section">

    <h2 className="section-title">Overall Progress</h2>

    <div className="status-card">
      <div className="status-card-top">
        <div>
          <p className="status-kicker">Student Snapshot</p>
          <div className="status-row status-row-main">
            <span>Overall Progress</span>
            <span className={`status-percent status-percent-${getProgressTone(progress.overall)}`}>
              {formatPercent(progress.overall)}
            </span>
          </div>
        </div>

        <div className={`status-badge status-badge-${getProgressTone(progress.overall)}`}>
          {progress.overall >= 75 ? "On Fire" : progress.overall >= 40 ? "On Track" : "Getting Started"}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress.overall}%` }}
        ></div>
      </div>

      <div className="status-summary-grid">
        {detailItems.map((item) => (
          <div key={item.key} className="status-summary-card">
            <span className="status-summary-label">{item.label}</span>
            <strong>{formatPercent(item.value)}</strong>
          </div>
        ))}
      </div>

      <button
        className="toggle-btn"
        onClick={() => setShowAll(!showAll)}
      >
        <span>{showAll ? "Hide Details" : "Show Details"}</span>
        <i className={`bx ${showAll ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
      </button>

      {showAll && (

        <div className="status-details">
          {detailItems.map((item) => (
            <div key={item.key} className="status-detail-block">
              <div className="status-row">
                <span>{item.label}</span>
                <span className={`status-percent status-percent-${getProgressTone(item.value)}`}>
                  {formatPercent(item.value)}
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className={`progress-fill progress-fill-${getProgressTone(item.value)}`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      )}

    </div>

  </div>
);
};

export default ProjectStatus;

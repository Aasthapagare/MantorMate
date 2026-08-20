import React, { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";

const ACTIVE_MEETING_LINK_KEY = "activeMeetingLink";
const ACTIVE_MEETING_TITLE_KEY = "activeMeetingTitle";

const buildEmbedUrl = (meetingLink, displayName) => {
  if (!meetingLink) {
    return "";
  }

  try {
    const url = new URL(meetingLink);
    url.hash = [
      "config.prejoinPageEnabled=false",
      "config.startWithAudioMuted=true",
      "config.startWithVideoMuted=false",
      `userInfo.displayName="${encodeURIComponent(displayName || "MentorMate User")}"`,
    ].join("&");
    return url.toString();
  } catch (error) {
    return meetingLink;
  }
};

const MeetingRoom = ({ username, onBack }) => {
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const link = localStorage.getItem(ACTIVE_MEETING_LINK_KEY) || "";
    const title =
      localStorage.getItem(ACTIVE_MEETING_TITLE_KEY) || "Live Meeting";

    setMeetingTitle(title);

    if (!link) {
      setError(
        "Meeting link is not available, Kindly join from Approved Meetings.",
      );
      return;
    }

    setMeetingLink(link);
  }, []);

  const embedUrl = useMemo(
    () =>
      buildEmbedUrl(
        meetingLink,
        username || localStorage.getItem("name") || "MentorMate User",
      ),
    [meetingLink, username],
  );

  return (
    <div className="dashboard-wrapper" style={{ minHeight: "100vh" }}>
      <header className="dashboard-header">
        <div className="header-left">
          <button className="sm-back-btn" onClick={onBack}>
            <i className="bx bx-arrow-back"></i>
            Back
          </button>
        </div>
        <div className="header-right">
          <div className="logo-container">
            <div className="logo-circle">
              <i className="bx bxs-video-recording"></i>
            </div>
            <h1 className="project-name">{meetingTitle}</h1>
          </div>
        </div>
      </header>

      <div
        className="dashboard-container"
        style={{ minHeight: "calc(100vh - 92px)" }}
      >
        <main
          className="dashboard-content"
          style={{ width: "100%", padding: "16px" }}
        >
          {error ? (
            <div className="sm-empty">
              <i className="bx bx-error"></i>
              <p>{error}</p>
            </div>
          ) : (
            <iframe
              title={meetingTitle}
              src={embedUrl}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              style={{
                width: "100%",
                height: "calc(100vh - 140px)",
                border: "0",
                borderRadius: "18px",
                background: "#0f172a",
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MeetingRoom;

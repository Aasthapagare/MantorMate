import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

const MeetingRoom = ({ username, onNavigate, onLogout }) => {

  const jitsiContainerRef = useRef(null);
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {

    // 🔥 Backend से meeting fetch करो
    fetch("http://localhost:8080/api/meetings/create")
      .then(res => res.json())
      .then(data => {
        setRoomName(data.roomName);
      });

  }, []);

  useEffect(() => {

    if (!roomName) return;

    const domain = "meet.jit.si";

    const options = {
      roomName: roomName,
      width: "100%",
      height: 600,
      parentNode: jitsiContainerRef.current,

      userInfo: {
        displayName: username || "Guest"
      }
    };

    const script = document.createElement("script");
    script.src = `https://${domain}/external_api.js`;

    script.onload = () => {
      new window.JitsiMeetExternalAPI(domain, options);
    };

    document.body.appendChild(script);

  }, [roomName, username]);

  return (
    <div className="dashboard-container">

      <Sidebar
        username={username}
        userRole="Student"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="dashboard-content">
        <h2>Live Meeting</h2>

        {roomName
          ? <div ref={jitsiContainerRef}></div>
          : <p>Creating meeting...</p>
        }

      </div>

    </div>
  );
};

export default MeetingRoom;

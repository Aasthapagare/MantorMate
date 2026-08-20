import React, { useState } from 'react';

const FooterIcons = ({ onOpenChat, onNavigate }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const footerItems = [
    { id: 'chat', icon: 'bx-message-dots', label: 'Chat' },
    { id: 'schedule', icon: 'bx-calendar', label: 'Schedule Meeting' },
    { id: 'join', icon: 'bx-video', label: 'Join Meeting' }
  ];

  const handleIconClick = (iconId) => {
    if (iconId === 'chat' && onOpenChat) {
      onOpenChat();
    } else if ((iconId === 'schedule' || iconId === 'join') && onNavigate) {
      onNavigate('meetingScheduler');
    }
  };

  return (
    <div className="footer-icons-container">
      {footerItems.map((item) => (
        <div
          key={item.id}
          className="footer-icon-wrapper"
          onMouseEnter={() => setHoveredIcon(item.id)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <button
            className="footer-icon-btn"
            onClick={() => handleIconClick(item.id)}
          >
            <i className={`bx ${item.icon}`}></i>
          </button>
          {hoveredIcon === item.id && (
            <div className="footer-tooltip">{item.label}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterIcons;

import React, { useState } from 'react';

const GuideFooter = ({ onOpenSearch, onOpenChat, onNavigate }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const footerIcons = [
    { id: 'search', icon: 'bx-search', label: 'Search', action: () => onOpenSearch && onOpenSearch() },
    { id: 'chat', icon: 'bx-message-dots', label: 'Chat', action: () => onOpenChat && onOpenChat() },
    { id: 'schedule', icon: 'bx-calendar-plus', label: 'Schedule Meeting', action: () => onNavigate && onNavigate('schedule') },
    { id: 'join', icon: 'bx-video', label: 'Join Meeting', action: () => onNavigate && onNavigate('meeting') }
  ];

  return (
    <footer className="guide-footer">
      <div className="guide-footer-container">
        {footerIcons.map((item) => (
          <div
            key={item.id}
            className="guide-footer-icon"
            onClick={item.action}
            onMouseEnter={() => setHoveredIcon(item.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="icon-circle">
              <i className={`bx ${item.icon}`}></i>
            </div>
            {hoveredIcon === item.id && (
              <div className="footer-label">{item.label}</div>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default GuideFooter;

// import React, { useState } from 'react';

// const FooterIcons = ({ onOpenChat, onOpenSearch, onNavigate }) => {
//   const [hoveredIcon, setHoveredIcon] = useState(null);

//   const footerItems = [
//     { id: 'search', icon: 'bx-search', label: 'Search' },
//     { id: 'chat', icon: 'bx-message-dots', label: 'Chat' },
//     { id: 'schedule', icon: 'bx-calendar', label: 'Schedule Meeting' },
//     { id: 'join', icon: 'bx-video', label: 'Join Meeting' }
//   ];

//   const handleIconClick = (iconId) => {
//     // FIX: Simply call the handlers - they will handle navigation
//     if (iconId === 'chat' && onOpenChat) {
//       onOpenChat();
//     } else if (iconId === 'search' && onOpenSearch) {
//       onOpenSearch();
//     }
//   };

//   return (
//     <div className="footer-icons-container">
//       {footerItems.map(item => (
//         <div 
//           key={item.id}
//           className="footer-icon-wrapper"
//           onMouseEnter={() => setHoveredIcon(item.id)}
//           onMouseLeave={() => setHoveredIcon(null)}
//         >
//           <button 
//             className="footer-icon-btn"
//             onClick={() => handleIconClick(item.id)}
//           >
//             <i className={`bx ${item.icon}`}></i>
//           </button>
//           {hoveredIcon === item.id && (
//             <div className="footer-tooltip">{item.label}</div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FooterIcons;

import React, { useState } from 'react';

const FooterIcons = ({ onOpenChat, onOpenSearch, onNavigate }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const footerItems = [
    { id: 'search', icon: 'bx-search', label: 'Search' },
    { id: 'chat', icon: 'bx-message-dots', label: 'Chat' },
    { id: 'schedule', icon: 'bx-calendar', label: 'Schedule Meeting' },
    { id: 'join', icon: 'bx-video', label: 'Join Meeting' }
  ];

  const handleIconClick = (iconId) => {
    if (iconId === 'chat' && onOpenChat) {
      onOpenChat();
    } else if (iconId === 'search' && onOpenSearch) {
      onOpenSearch();
    } else if (iconId === 'schedule' && onNavigate) {
      // Navigate to Meeting Scheduler page
      onNavigate('meetingScheduler');
    }
  };

  return (
    <div className="footer-icons-container">
      {footerItems.map(item => (
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
// import React, { useState, useEffect, useRef } from 'react';

// const DashboardCards = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollRef = useRef(null);
//   const autoScrollInterval = useRef(null);

//   const cards = [
//     {
//       id: 1,
//       title: 'Ask Doubt',
//       icon: 'bx-help-circle',
//       description: 'Get your questions answered by mentors',
//       color: '#667eea'
//     },
//     {
//       id: 2,
//       title: 'Upload Files',
//       icon: 'bx-upload',
//       description: 'Share documents and assignments',
//       color: '#f093fb'
//     },
//     {
//       id: 3,
//       title: 'Schedule Meeting',
//       icon: 'bx-calendar-plus',
//       description: 'Book sessions with your mentor',
//       color: '#4facfe'
//     },
//     {
//       id: 4,
//       title: 'Join Meeting',
//       icon: 'bx-video',
//       description: 'Connect with your mentor instantly',
//       color: '#43e97b'
//     }
//   ];

//   // Auto-scroll functionality
//   useEffect(() => {
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, []);

//   const startAutoScroll = () => {
//     autoScrollInterval.current = setInterval(() => {
//       setCurrentIndex((prevIndex) => {
//         const newIndex = (prevIndex + 1) % cards.length;
//         scrollToCard(newIndex);
//         return newIndex;
//       });
//     }, 4000); // Change card every 4 seconds
//   };

//   const stopAutoScroll = () => {
//     if (autoScrollInterval.current) {
//       clearInterval(autoScrollInterval.current);
//     }
//   };

//   const scrollToCard = (index) => {
//     if (scrollRef.current) {
//       const cardWidth = scrollRef.current.offsetWidth;
//       scrollRef.current.scrollTo({
//         left: cardWidth * index,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const handleCardClick = (index) => {
//     stopAutoScroll();
//     setCurrentIndex(index);
//     scrollToCard(index);
//     setTimeout(startAutoScroll, 5000); // Resume auto-scroll after 5 seconds
//   };

//   const handleManualScroll = () => {
//     stopAutoScroll();
//     setTimeout(startAutoScroll, 5000);
//   };

//   return (
//     <div className="dashboard-cards-section">
//       <h2 className="section-title">Quick Actions</h2>
      
//       {/* Cards Container */}
//       <div 
//         className="cards-container"
//         ref={scrollRef}
//         onScroll={handleManualScroll}
//       >
//         {cards.map((card, index) => (
//           <div 
//             key={card.id}
//             className="dashboard-card"
//             style={{ '--card-color': card.color }}
//             onClick={() => handleCardClick(index)}
//           >
//             <div className="card-icon">
//               <i className={`bx ${card.icon}`}></i>
//             </div>
//             <h3 className="card-title">{card.title}</h3>
//             <p className="card-description">{card.description}</p>
//             <button className="card-action">
//               Get Started <i className='bx bx-right-arrow-alt'></i>
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Dots */}
//       <div className="pagination-dots">
//         {cards.map((_, index) => (
//           <button
//             key={index}
//             className={`dot ${currentIndex === index ? 'active' : ''}`}
//             onClick={() => handleCardClick(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardCards;

import React from 'react';

const DashboardCards = () => {
  const cards = [
    {
      id: 1,
      title: 'Ask Doubt',
      icon: 'bx-help-circle',
      description: 'Get your questions answered by mentors',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    },
    {
      id: 2,
      title: 'Upload Files',
      icon: 'bx-upload',
      description: 'Share documents and assignments',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    },
    {
      id: 3,
      title: 'Schedule Meeting',
      icon: 'bx-calendar-plus',
      description: 'Book sessions with your mentor',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)'
    },
    {
      id: 4,
      title: 'Join Meeting',
      icon: 'bx-video',
      description: 'Connect with your mentor instantly',
      gradient: 'linear-gradient(135deg, #1A252F 0%, #2C3E50 100%)'
    },
    {
      id: 5,
      title: 'Create Project Group',
      icon: 'bx-group',
      description: 'Collaborate with team members',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    },
    {
      id: 6,
      title: 'Choose a Guide',
      icon: 'bx-user-check',
      description: 'Select your project mentor',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    },
    {
      id: 7,
      title: 'Submit Project Idea',
      icon: 'bx-bulb',
      description: 'Share your innovative ideas',
      gradient: 'linear-gradient(135deg, #1A252F 0%, #34495E 100%)'
    }
  ];

  return (
    <div className="dashboard-cards-section">
      <h2 className="section-title">Quick Actions</h2>
      
      <div className="cards-scroll-container">
        <div className="cards-track">
          {[...cards, ...cards].map((card, index) => (
            <div 
              key={`${card.id}-${index}`}
              className="dashboard-card"
              style={{ background: card.gradient }}
            >
              <div className="card-icon">
                <i className={`bx ${card.icon}`}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <button className="card-action">
                Get Started <i className='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;